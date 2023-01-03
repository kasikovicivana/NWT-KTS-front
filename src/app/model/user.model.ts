import { Note } from './note.model';

export class UserInfo {
  constructor(public username: string = '', public password: string = '') {}
}

export class User {
  public notes: [Note] | undefined;

  constructor(
    public id: number = -1,
    public name: string = '',
    public surname: string = '',
    public email: string = '',
    public password: string = '',
    public city: string = '',
    public phoneNumber: string = '',
    public role: string = 'Driver',
    public cardNumber: string = '',
    public photo: string = '',
    public isSocialLogin: boolean = false,
    public blocked: boolean = false
  ) {}
}

export class LoggedUser {
  constructor(
    public userEmail: string = '',
    public accessToken: string = '',
    public expiresIn: string = '',
    public role: string = ''
  ) {}
}
