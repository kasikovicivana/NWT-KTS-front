import { Position } from './position.model';

export class Route {
  public start: Position;
  public end: Position;
  public type: string;

  constructor(r: any) {
    this.start = new Position(r.startPosition);
    this.end = new Position(r.endPosition);
    this.type = r.type;
  }
}
