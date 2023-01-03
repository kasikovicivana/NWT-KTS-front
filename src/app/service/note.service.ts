import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { Client } from '../model/client.model';
import { HttpClient } from '@angular/common/http';
import { LoginService } from './login.service';
import { Note } from '../model/note.model';
import { ProfileViewService } from './profile-view.service';
import { Driver } from '../model/driver.model';
import { Observable, Subject } from 'rxjs';
import { EditNote } from '../model/editNote.model';

@Injectable({
  providedIn: 'root',
})
export class NoteService {
  public maxId: number = -1;

  constructor(
    private _http: HttpClient,
    private loginService: LoginService,
    private userService: ProfileViewService
  ) {
    this.getMaxId().subscribe({
      next: (info) => {
        this.maxId = info.data;
        console.log(this.maxId);
      },
    });
  }

  noteUrl = environment.backendUrl + 'api/note';

  editNotes(data: EditNote): void {
    let { driverId, clientId } = NoteService.getNoteInfo(data.user);
    if (data.notes != undefined && data.notesObj != undefined) {
      for (let noteId in data.notes) {
        if (eval(noteId) >= data.notesObj.length) {
          let newNote: Note = {
            id: this.maxId + 1,
            comment: data.notes[eval(noteId)],
            adminId: data.adminId,
            clientId: clientId,
            driverId: driverId,
          };
          data.notesObj.push(newNote);
          this.maxId = this.maxId + 1;
        } else {
          data.notesObj[eval(noteId)].comment = data.notes[eval(noteId)];
        }
      }
    }
  }

  saveNotes(data: EditNote) {
    const newUrl = this.noteUrl + '/saveNotes';
    return this._http.post<any>(newUrl, data.notesObj, {
      headers: this.loginService.getAuthorizationHeader(),
    });
  }

  private static getNoteInfo(user: Driver | Client) {
    let driverId: number = -1;
    let clientId: number = -1;
    if (user.role === 'Driver') {
      driverId = user.id;
    } else {
      clientId = user.id;
    }
    return { driverId, clientId };
  }

  getAdminInfo(): Observable<number> {
    let adminId = -1;
    let subject = new Subject<number>();
    this.userService.getLoggedUser().subscribe({
      next: (data) => {
        adminId = data.id;
        subject.next(adminId);
      },
    });
    return subject.asObservable();
  }

  remove(note: Note): Observable<HttpClient> {
    const newUrl = this.noteUrl + '/deleteNote/' + note.id;
    return this._http.delete<any>(newUrl, {
      headers: this.loginService.getAuthorizationHeader(),
    });
  }

  getMaxId() {
    const newUrl = this.noteUrl + '/getMaxId';
    return this._http.get<any>(newUrl, {
      headers: this.loginService.getAuthorizationHeader(),
    });
  }

  getNotes(user: Client | Driver) {
    const newUrl = this.noteUrl + '/getNotes/' + user.id;
    return this._http.get<any>(newUrl, {
      headers: this.loginService.getAuthorizationHeader(),
    });
  }
}
