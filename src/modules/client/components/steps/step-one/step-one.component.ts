import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { CarService } from '../../../../shared/services/car-service/car.service';
import { CarType } from '../../../../app/model/carType.model';
import { Driver } from '../../../../app/model/driver.model';
import { DriverService } from '../../../../shared/services/driver-service/driver.service';

@Component({
  selector: 'app-step-one',
  templateUrl: './step-one.component.html',
  styleUrls: ['./step-one.component.css'],
})
export class StepOneComponent implements OnInit {
  public stepOneForm: FormGroup;
  active = '';
  carTypes: CarType[] = [];
  petsCheckbox = false;
  babiesCheckbox = false;
  driver: Driver | undefined;

  price = 0;

  @Input() distance = 0;

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
        this.active = this.carTypes[0].type;
        this.price = this.carTypes[0].price + 120 * this.distance;
      },
    });
  }

  selectCar(car: CarType) {
    this.active = car.type;
    this.price = car.price + 120 * this.distance;
  }

  getData(): any {
    return {
      car: this.active,
      pet: this.petsCheckbox,
      babies: this.babiesCheckbox,
      price: this.price,
    };
  }
}
