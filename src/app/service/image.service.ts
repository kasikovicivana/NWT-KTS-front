import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { Image } from '../model/image.model';
import { LoginService } from './login.service';

@Injectable({
  providedIn: 'root',
})
export class ImageService {
  constructor(private _http: HttpClient, private loginService: LoginService) {}

  url = environment.backendUrl + 'api/image';

  HTTPOptionsForBlob: Object = {
    responseType: 'blob',
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
      Authorization: `Bearer ` + sessionStorage.getItem('accessToken'),
    }),
  };

  loadImage(photoUrl: string) {
    const newUrl = this.url + '/getImage/' + photoUrl;
    return this._http.get<any>(newUrl, this.HTTPOptionsForBlob);
  }

  addImage(image: Image) {
    const newUrl = this.url + '/addImage';
    const header = this.loginService.getAuthorizationHeader();
    return this._http.post<any>(newUrl, image, { headers: header });
  }
}
