import {Injectable} from '@angular/core';
import Swal from 'sweetalert2';

@Injectable({
  providedIn: 'root',
})

export class AlertsService{

  constructor() { }


  errorAlert(text:string) {
    Swal.fire({
      icon: 'error',
      title: 'Oops...',
      text: text,
      confirmButtonColor: 'red',
      width: 350
    })
  }

  successAlert() {
    Swal.fire({
      icon: 'success',
      title: 'Success',
      text: 'Bravo kralju!',
      confirmButtonColor: 'green',
      width: 350
    })
  }

}
