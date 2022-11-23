export class Client {
  constructor(
    public id: number = -1,
    public name: string = '',
    public surname: string = '',
    public email: string = '',
    public password: string = '',
    public phoneNumber: string = '',
    public role: string = 'Client',
    public city: string = '',
    public cardNumber: string = '',
    public photo: string = '',
    public enabled: boolean = true,
    public blocked: boolean = false,
  ) {}
}
