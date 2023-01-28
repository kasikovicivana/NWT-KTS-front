import { Driver } from './driver.model';
import { Route } from './route.model';
import { Client, ClientDrive } from './client.model';

export class Drive {
  constructor(
    public id: number = 0,
    public driver: Driver = new Driver(),
    public startTime: Date = new Date(),
    public endTIme: Date = new Date(),
    public price: number = 0,
    public status: string = '',
    public routes: Set<Route> = new Set<Route>(),
    public passengers: Set<ClientDrive> = new Set<ClientDrive>(),
    public distance: number = 0
  ) {}
}
