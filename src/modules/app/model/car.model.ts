export class CarModel {
  constructor(
    public id: number = -1,
    public type: string,
    public petFriendly: boolean,
    public babiesAllowed: boolean,
    public driverId: number
  ) {}
}
