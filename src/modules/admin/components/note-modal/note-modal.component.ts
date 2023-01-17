import { Component, EventEmitter, Input, Output } from '@angular/core';
import { EditNote } from '../../../app/model/editNote.model';
import { Client } from '../../../app/model/client.model';
import { Driver } from '../../../app/model/driver.model';
import { NoteService } from '../../services/note-service/note.service';
import { Note } from '../../../app/model/note.model';
import { AlertsService } from '../../../shared/services/alerts-service/alerts.service';

@Component({
  selector: 'app-note-modal',
  templateUrl: './note-modal.component.html',
  styleUrls: ['./note-modal.component.css'],
})
export class NoteModalComponent {
  @Input()
  currentUser!: Client | Driver | undefined;

  @Input()
  notes!: [string];

  @Input()
  notesObj!: [Note] | undefined;

  @Output() closeEvent = new EventEmitter<void>();

  constructor(
    private noteService: NoteService,
    private alertService: AlertsService
  ) {}

  customTrackBy(index: number): number {
    return index;
  }

  close(): void {
    this.closeEvent.next();
  }

  addNote(): void {
    if (this.currentUser != undefined) {
      if (this.notes != undefined) this.notes.push('');
      else this.notes = [''];
    }
  }

  removeNote(i: number): void {
    if (this.notes != undefined) {
      this.notes.splice(i, 1);
    }
    if (this.notesObj != undefined && i < this.notesObj.length) {
      this.noteService.remove(this.notesObj[i]).subscribe();
      this.notesObj.splice(i, 1);
    }
  }

  saveNotes(): void {
    if (this.currentUser != undefined) {
      let data = new EditNote();
      data.notesObj = this.notesObj;
      data.notes = this.notes;
      data.user = this.currentUser;
      this.noteService.getAdminInfo().subscribe((res) => {
        data.adminId = res;
        this.noteService.editNotes(data);
        this.noteService.saveNotes(data).subscribe();
        this.close();
        this.alertService.successAlert();
      });
    }
  }
}