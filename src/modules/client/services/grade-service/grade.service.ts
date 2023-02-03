import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../../environments/environment';
import { GradeModel } from '../../../app/model/grade.model';

@Injectable({
  providedIn: 'root',
})
export class GradeService {
  gradeUrl = environment.backendUrl + 'api/grade';

  constructor(private _http: HttpClient) {}

  getGrade(id: number) {
    const newUrl = this.gradeUrl + '/getGrade/' + id;
    return this._http.get<GradeModel>(newUrl);
  }

  getAllDriveGrades(driveId: number) {
    const newUrl = this.gradeUrl + '/getAllGrades/' + driveId;
    return this._http.get<GradeModel[]>(newUrl);
  }

  saveGrade(grade: GradeModel) {
    const newUrl = this.gradeUrl + '/save';
    return this._http.post<string>(newUrl, grade);
  }
}
