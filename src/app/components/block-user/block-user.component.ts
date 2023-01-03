import { Component, OnInit } from '@angular/core';
import { UserService } from '../../service/user.service';
import { Note } from '../../model/note.model';
import { Client } from '../../model/client.model';
import { Driver } from '../../model/driver.model';
import { NoteService } from '../../service/note.service';

@Component({
  selector: 'app-block-user',
  templateUrl: './block-user.component.html',
  styleUrls: ['./block-user.component.css'],
})
export class BlockUserComponent implements OnInit {
  pageSize: number;
  currentPage: number;
  totalSize: number;

  clients: [Client] | undefined;
  drivers: [Driver] | undefined;

  showModal: boolean = false;
  notes: [string];
  notesObj: [Note] | undefined;
  currentUser: Client | Driver | undefined;
  showClients: boolean = true;

  constructor(
    private userService: UserService,
    private noteService: NoteService
  ) {
    this.pageSize = 4;
    this.currentPage = 1;
    this.totalSize = 0;
    this.notes = [''];
  }

  ngOnInit(): void {
    this.getClients(0);
  }

  getClients(page: number): void {
    this.showClients = true;
    this.userService.getClients(page, this.pageSize).subscribe((data) => {
      this.clients = data.body;
      this.totalSize = Number(data.headers.get('Total-items'));
      if (this.clients != undefined && this.clients?.length < 1) {
        this.clients = undefined;
      }
    });
  }

  getDrivers(page: number): void {
    this.showClients = false;
    this.userService.getDrivers(page, this.pageSize).subscribe((data) => {
      this.drivers = data.body;
      this.totalSize = Number(data.headers.get('Total-items'));
      if (this.drivers != undefined) this.totalSize = this.drivers?.length;
      if (this.drivers != undefined && this.drivers?.length < 1) {
        this.drivers = undefined;
      }
    });
  }

  viewModal(user: Client | Driver): void {
    this.showModal = true;
    this.currentUser = user;
    this.noteService.getNotes(user).subscribe({
      next: (info) => {
        this.notesObj = info;
        if (user.notes != undefined && user.notes.length < 1) {
          this.notes = [''];
        }
        this.extractNoteComments();
      },
    });
  }

  private extractNoteComments(): void {
    this.notes = [''];
    for (let note in this.notesObj) {
      if (this.notes[0] === '') {
        this.notes.pop();
      }
      this.notes?.push(this.notesObj[eval(note)].comment);
    }
  }

  blockClient(client: Client): void {
    client.blocked = !client.blocked;
    this.userService.saveClient(client).subscribe();
  }

  blockDriver(driver: Driver): void {
    driver.blocked = !driver.blocked;
    this.userService.saveDriver(driver).subscribe();
  }

  close(): void {
    this.showModal = false;
  }

  changePage(newPage: number): void {
    this.currentPage = newPage;
    if (this.showClients) {
      this.getClients(newPage - 1);
    } else {
      this.getDrivers(newPage - 1);
    }
  }
}
