import { Injectable } from '@angular/core';
import { environment } from '../../../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { Note } from '../../../app/model/note.model';
import { Observable } from 'rxjs';
import { EditNote } from '../../../app/model/editNote.model';
import { User } from '../../../app/model/user.model';

@Injectable({
  providedIn: 'root',
})
export class NoteService {
  public maxId = -1;
  noteUrl = environment.backendUrl + 'api/note';

  constructor(private _http: HttpClient) {
    this.getMaxId().subscribe({
      next: (info) => {
        this.maxId = info;
        console.log(this.maxId);
      },
    });
  }

  private static getNoteInfo(user: User) {
    let driverId = -1;
    let clientId = -1;
    if (user.role === 'Driver') {
      driverId = user.id;
    } else {
      clientId = user.id;
    }
    return { driverId, clientId };
  }

  editNotes(data: EditNote): void {
    const { driverId, clientId } = NoteService.getNoteInfo(data.user);
    if (data.notes != undefined && data.notesObj != undefined) {
      for (const noteId in data.notes) {
        if (eval(noteId) >= data.notesObj.length) {
          const newNote: Note = {
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
    return this._http.post<string>(newUrl, data.notesObj);
  }

  remove(note: Note): Observable<HttpClient> {
    const newUrl = this.noteUrl + '/deleteNote/' + note.id;
    return this._http.delete<any>(newUrl);
  }

  getMaxId() {
    const newUrl = this.noteUrl + '/getMaxId';
    return this._http.get<number>(newUrl);
  }

  getNotes(user: User) {
    const newUrl = this.noteUrl + '/getNotes/' + user.id;
    return this._http.get<Note[]>(newUrl);
  }
}
