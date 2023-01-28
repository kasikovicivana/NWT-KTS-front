export class Position {
  public lat: number;
  public lon: number;

  constructor(pos: any) {
    this.lat = pos.lat;
    this.lon = pos.lon;
  }
}
