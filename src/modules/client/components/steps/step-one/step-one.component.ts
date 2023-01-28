import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { CarService } from '../../../../shared/services/car-service/car.service';
import { CarType } from '../../../../app/model/carType.model';
import { Driver } from '../../../../app/model/driver.model';
import { UserService } from '../../../../shared/services/user-service/user.service';
import { CarModel } from '../../../../app/model/car.model';
import { DriverService } from '../../../../shared/services/driver-service/driver.service';

@Component({
  selector: 'app-step-one',
  templateUrl: './step-one.component.html',
  styleUrls: ['./step-one.component.css'],
})
export class StepOneComponent implements OnInit {
  public stepOneForm: FormGroup;
  active: string = 'Comfort ride';
  carTypes: [CarType] | undefined;
  petsCheckbox: boolean = false;
  babiesCheckbox: boolean = false;
  driver: Driver | undefined;

  constructor(
    private fb: FormBuilder,
    private carService: CarService,
    private driverService: DriverService
  ) {
    this.stepOneForm = this.fb.group({});
  }

  ngOnInit(): void {
    this.carService.getCarTypes().subscribe({
      next: (data) => {
        this.carTypes = data;
      },
    });
  }

  stepOneSubmit() {}

  selectCar(car: string) {
    this.active = car;
  }

  findDriver() {
    let car: CarModel = {
      type: this.active,
      babiesAllowed: this.babiesCheckbox,
      petFriendly: this.petsCheckbox,
      id: 0,
      driverId: 0,
    };
    this.driverService.findActiveDriver(car).subscribe({
      next: (data) => {
        this.driver = data;
      },
    });
  }
}
