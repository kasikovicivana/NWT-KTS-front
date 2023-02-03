import { RouteDetails } from './routeDetails';

export class ScheduleInfo {
  public passengers: string[] = [];
  public car = '';
  public babies = false;
  public pet = false;
  public price = 0;
  public distance = 0;
  public duration = 0;
  public splitFaire = false;
  public reservation = false;
  public routes: RouteDetails[] = [];
  public reservationTime: Date | undefined = undefined;

  public favourite = false;

  public constructor(s: any) {
    this.passengers = s.passengers;
    this.car = s.car;
    this.babies = s.babies;
    this.pet = s.pet;
    this.price = s.price;
    this.distance = s.distance;
    this.duration = s.duration;
    this.splitFaire = s.splitFaire;
    this.reservation = s.reservation;
    this.routes = s.routes;
    this.reservationTime = s.reservationTime;
    this.favourite = s.favourite;
  }
}
