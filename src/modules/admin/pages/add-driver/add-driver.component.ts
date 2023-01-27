import { Component, OnInit } from '@angular/core';
import { User } from '../../../app/model/user.model';
import { CarType } from '../../../app/model/carType.model';
import { CarService } from '../../../shared/services/car-service/car.service';
import { AlertsService } from '../../../shared/services/alerts-service/alerts.service';
import { UserService } from '../../../shared/services/user-service/user.service';
import { CarModel } from '../../../app/model/car.model';
import { RegistrationService } from '../../../app/service/registration-service/registration.service';

@Component({
  selector: 'app-add-driver',
  templateUrl: './add-driver.component.html',
  styleUrls: ['./add-driver.component.css'],
})
export class AddDriverComponent implements OnInit {
  carTypes: [CarType] | undefined;
  isReadonly: boolean = true;
  viewCarTypeInfo: boolean = false;
  type: string = 'Van XL';
  babiesAllowed: boolean = false;
  petFriendly: boolean = false;
  emailPattern =
    /^(?=.{1,254}$)(?=.{1,64}@)[-!#$%&'*+/\d=?A-Z^_`a-z{|}~]+(\.[-!#$%&'*+/\d=?A-Z^_`a-z{|}~]+)*@[A-Za-z\d]([A-Za-z\d-]{0,61}[A-Za-z\d])?(\.[A-Za-z\d]([A-Za-z\d-]{0,61}[A-Za-z\d])?)*$/;
  phoneNumberPattern = /^(\+)?\d{8}\d+$/;
  private isDataValid: boolean = false;

  constructor(
    private carService: CarService,
    private alerts: AlertsService,
    private registrationService: RegistrationService
  ) {}

  isDriver = true;
  user = new User();
  reenteredPassword = '';

  ngOnInit(): void {
    this.carService.getCarTypes().subscribe({
      next: (data) => {
        this.carTypes = data;
      },
    });
  }

  modalView() {
    this.viewCarTypeInfo = true;
  }

  changeBabiesAllowed() {
    this.babiesAllowed = !this.babiesAllowed;
  }

  changepetFriendly() {
    this.petFriendly = !this.petFriendly;
  }
  validateData() {
    this.isDataValid =
      this.user.name != '' &&
      this.user.surname != '' &&
      this.user.email != '' &&
      this.user.phoneNumber != '' &&
      this.user.city != '' &&
      this.user.password != '' &&
      this.user.role != '' &&
      this.emailPattern.test(this.user.email) &&
      this.phoneNumberPattern.test(this.user.phoneNumber);
  }

  addDriver() {
    this.validateData();
    if (this.isDataValid) {
      let car: CarModel = {
        type: this.type,
        babiesAllowed: this.babiesAllowed,
        petFriendly: this.petFriendly,
        id: -1,
        driverId: -1,
      };

      this.registrationService.registerUser(this.user).subscribe({
        next: (data) => {
          this.alerts.successAlert();
          car.driverId = data.id;
          this.carService.saveCar(car).subscribe();
        },
        error: (err) => this.alerts.errorAlert('You already have account!'),
      });
    } else {
      this.alerts.errorAlert('You must fill all fields!');
    }
  }
}
