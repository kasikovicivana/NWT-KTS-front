import { Position } from './position.model';

export class RouteDetails {
  public coordinates: number[][] = [];
  public type: string = 'recommended';
  public duration: number = 0;
  public distance: number = 0;

  public start: Position | undefined;
  public end: Position | undefined;

  public constructor(r: any) {
    this.coordinates = r.coordinates;
    this.type = r.type;
    this.duration = Math.round((r.duration / 60) * 10) / 10;
    this.distance = Math.round((r.distance / 1000) * 10) / 10;

    this.start = r.start;
    this.end = r.end;
  }
}
