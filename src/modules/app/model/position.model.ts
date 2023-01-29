export class Position {
  public lat: number;
  public lon: number;
  public address: string = '';

  constructor(pos: any) {
    this.lat = pos.lat;
    this.lon = pos.lon;
    if (pos.address !== undefined) {
      this.address = pos.address;
    }
  }
}
