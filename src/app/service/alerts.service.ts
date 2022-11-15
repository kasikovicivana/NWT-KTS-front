import {Injectable} from '@angular/core';
import Swal from 'sweetalert2';

@Injectable({
  providedIn: 'root',
})

export class AlertsService{

  constructor() { }


  tinyAlert() {
    Swal.fire({
      icon: 'error',
      title: 'Oops...',
      text: 'Wrong credentials!',
      confirmButtonColor: 'red',
      width: 350
    })
  }

}
