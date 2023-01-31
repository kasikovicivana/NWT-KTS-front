import { Route } from './route.model';

function parseDate(date: any): Date {
  if (!date.includes('T')) {
    return new Date(
      date.start[0],
      date.start[1] - 1,
      date.start[2],
      date.start[3],
      date.start[4]
    );
  }

  return new Date(date.concat('Z'));
}

export class DriverRoutes {
  public routes: Route[] = [];
  public username: string = '';
  public start: Date;

  constructor(r: any) {
    this.username = r.username;
    this.start = parseDate(r.startTime);
    for (let route of r.routes) {
      this.routes.push(new Route(route));
    }
  }
}
