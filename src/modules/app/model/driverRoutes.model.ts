import { Route } from './route.model';

export class DriverRoutes {
  constructor(
    public routes: Route[] = [],
    public username: string = '',
    public startTime: string = ''
  ) {}
}
