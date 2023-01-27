import { Injectable } from '@angular/core';
import { environment } from '../../../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { CarModel } from '../../../app/model/car.model';

@Injectable({
  providedIn: 'root',
})
export class CarService {
  constructor(private _http: HttpClient) {}

  url = environment.backendUrl + 'api/car';

  getCarTypes() {
    const newUrl = this.url + '/getCarTypes';
    return this._http.get<any>(newUrl);
  }

  saveCar(car: CarModel) {
    const newUrl = this.url + '/saveCar';
    return this._http.post<any>(newUrl, car);
  }
}
