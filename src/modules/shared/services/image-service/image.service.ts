import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from '../../../../environments/environment';
import { Image } from '../../../app/model/image.model';
import { LoginService } from '../../../app/service/login-service/login.service';

@Injectable({
  providedIn: 'root',
})
export class ImageService {
  url = environment.backendUrl + 'api/image';
  HTTPOptionsForBlob: Object = {
    responseType: 'blob',
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
      Authorization: `Bearer ` + sessionStorage.getItem('accessToken'),
    }),
  };

  constructor(private _http: HttpClient) {}

  loadImage(photoUrl: string) {
    const newUrl = this.url + '/getImage/' + photoUrl;
    return this._http.get<any>(newUrl, this.HTTPOptionsForBlob);
  }

  addImage(image: Image) {
    const newUrl = this.url + '/addImage';
    return this._http.post<any>(newUrl, image, this.HTTPOptionsForBlob);
  }
}
