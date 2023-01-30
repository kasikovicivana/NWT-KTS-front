import { RouteDetails } from './routeDetails';

export class ScheduleInfo {
  public passengers: string[] = [];
  public car: string = '';
  public babies: boolean = false;
  public pet: boolean = false;
  public price: number = 0;
  public distance: number = 0;
  public duration: number = 0;
  public splitFaire: boolean = false;
  public reservation: boolean = false;
  public routes: RouteDetails[] = [];
  public reservationTime: Date | undefined = undefined;

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
  }
}
