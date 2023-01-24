import { Driver } from './driver.model';
import { Route } from './route.model';

export class Drive {
  constructor(
    public id: number,
    public driver: Driver,
    public startTime: number[],
    public endTIme: number[],
    public price: number,
    public status: string,
    public routes: Set<Route> = new Set<Route>()
  ) {}
}
