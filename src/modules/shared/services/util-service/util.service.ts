import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class UtilService {
  public getNoPages(totalItems?: number, pageSize?: number): number {
    console.log(totalItems);
    if (totalItems != undefined && pageSize != undefined)
      return Math.ceil(totalItems / pageSize);
    else return -1;
  }
}
