export class Position {
  public id: number;
  public lat: number;
  public lon: number;

  constructor(pos: any) {
    this.id = pos.id;
    this.lat = pos.lat;
    this.lon = pos.lon;
  }
}
