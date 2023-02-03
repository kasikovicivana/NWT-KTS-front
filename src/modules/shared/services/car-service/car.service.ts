import { Injectable } from '@angular/core';
import { environment } from '../../../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { CarModel } from '../../../app/model/car.model';
import { CarType } from '../../../app/model/carType.model';

@Injectable({
  providedIn: 'root',
})
export class CarService {
  url = environment.backendUrl + 'api/car';

  constructor(private _http: HttpClient) {}

  getCarTypes() {
    const newUrl = this.url + '/getCarTypes';
    return this._http.get<CarType[]>(newUrl);
  }

  saveCar(car: CarModel) {
    const newUrl = this.url + '/saveCar';
    return this._http.post<string>(newUrl, car);
  }
}
