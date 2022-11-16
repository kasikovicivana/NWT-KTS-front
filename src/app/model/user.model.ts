export class UserInfo {
  constructor(public username: string = '', public password: string = '') {}
}

export class User{
  constructor(public id: number = -1,
              public name: string = '',
              public surname: string = '',
              public email: string = '',
              public password: string = '',
              public city: string = '',
              public phoneNumber: string = '',
              public role: string = 'Driver',
              public cardNumber: string = '',
              ) {}
}

export class LoggedUser{
  constructor(
    public userEmail: string = '',
    public accessToken: string = '',
    public expiresIn: string = '',
    public role: string = ''
  ) {}


}
