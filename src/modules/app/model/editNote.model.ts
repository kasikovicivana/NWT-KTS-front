import { Note } from './note.model';
import { Driver } from './driver.model';
import { Client } from './client.model';

export class EditNote {
  public notesObj: Note[] = [];
  public notes: [string] | undefined;

  constructor(
    public adminId: number = -1,
    public user: Driver | Client = new Driver()
  ) {}
}
