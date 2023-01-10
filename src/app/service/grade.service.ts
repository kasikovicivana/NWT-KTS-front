import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { LoginService } from './login.service';
import { GradeModel } from '../model/grade.model';

@Injectable({
  providedIn: 'root',
})
export class GradeService {
  constructor(private _http: HttpClient, private loginService: LoginService) {}

  gradeUrl = environment.backendUrl + 'api/grade';

  getGrade() {
    const newUrl = this.gradeUrl + '/getGrade/' + 1; //driveId
    return this._http.get<any>(newUrl, {
      headers: this.loginService.getAuthorizationHeader(),
    });
  }

  saveGrade(grade: GradeModel) {
    const newUrl = this.gradeUrl + '/save';
    return this._http.post<any>(newUrl, grade, {
      headers: this.loginService.getAuthorizationHeader(),
    });
  }
}
