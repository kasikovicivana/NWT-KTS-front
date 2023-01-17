import { Note } from './note.model';

export class Driver {
  public notes: [Note] | undefined;

  constructor(
    public id: number = -1,
    public name: string = '',
    public surname: string = '',
    public email: string = '',
    public password: string = '',
    public phoneNumber: string = '',
    public role: string = 'Client',
    public city: string = '',
    public tokens: number = 0.0,
    public photo: string = '',
    public enabled: boolean = true,
    public blocked: boolean = false,
    public isSocialLogin: boolean = false
  ) {}
}
