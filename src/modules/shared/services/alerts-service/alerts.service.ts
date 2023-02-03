import { Injectable } from '@angular/core';
import Swal from 'sweetalert2';

@Injectable({
  providedIn: 'root',
})
export class AlertsService {
  constructor() {
    // TODO document why this constructor is empty
  }

  errorAlert(text: string) {
    Swal.fire({
      icon: 'error',
      title: 'Oops...',
      text: text,
      confirmButtonColor: 'red',
      width: 350,
    });
  }

  errorAlertCustomMessage(errorMessage: string) {
    Swal.fire({
      icon: 'error',
      title: 'Oops...',
      text: errorMessage,
      confirmButtonColor: 'red',
      width: 350,
    });
  }

  successAlert() {
    Swal.fire({
      icon: 'success',
      title: 'Successfully done!',
      text: 'Congratulations!',
      confirmButtonColor: 'green',
      width: 350,
    });
  }

  successEditRequestAlert() {
    Swal.fire({
      icon: 'success',
      title: 'Successfully done!',
      text: 'Admin will review your request soon!',
      confirmButtonColor: 'green',
      width: 350,
    });
  }
}
