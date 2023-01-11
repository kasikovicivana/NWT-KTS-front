import { Route } from './route.model';

export class DriverRoutes {
  public routes: Set<Route> = new Set<Route>();
  public username: string = '';
  public start: number[];

  constructor(r: any) {
    this.username = r.username;
    this.start = r.startTime;
    for (let route of r.routes) {
      this.routes.add(new Route(route));
    }
  }
}
