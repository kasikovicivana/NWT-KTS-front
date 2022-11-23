import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {environment} from "../../environments/environment";
import { Image} from "../model/image.model";

@Injectable({
  providedIn: 'root'
})
export class ImageService {

  constructor(private _http:HttpClient) {}

  url = environment.backendUrl + 'api/image';

  HTTPOptionsForBlob: Object = {
    responseType: 'blob'
  }

  loadImage(photoUrl: string){
    const newUrl = this.url + '/getImage/'+photoUrl;
    return this._http.get<any>(newUrl,this.HTTPOptionsForBlob);
  }

  addImage(image: Image){
    const newUrl = this.url + '/addImage';
    console.log(image.data)
    console.log("ide post za sliku")
    console.log(image.path)
    return this._http.post<any>(newUrl,image);
  }

}
