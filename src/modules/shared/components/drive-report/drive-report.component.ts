import { Component, OnInit } from '@angular/core';
import { Drive } from '../../../app/model/drive.model';
import { DriveService } from '../../services/drive-service/drive.service';
import { Report } from '../../../app/model/report.model';
import { AlertsService } from '../../services/alerts-service/alerts.service';

@Component({
  selector: 'app-drive-report',
  templateUrl: './drive-report.component.html',
  styleUrls: ['./drive-report.component.css'],
})
export class DriveReportComponent implements OnInit {
  today: string = new Date().toLocaleDateString('en-ca');
  startDate: string = '';
  endDate: string = '';
  xData: string[] = [];
  yDataRides: number[] = [];
  yDataDistance: number[] = [];
  yDataPrice: number[] = [];
  ridesSum: number = 0;
  distanceSum: number = 0;
  priceSum: number = 0;
  drives: Drive[] = [];
  show: boolean = true;

  constructor(
    public driveService: DriveService,
    public alertService: AlertsService
  ) {}

  ngOnInit(): void {}

  setDatesInChart() {
    let start = new Date(this.startDate);
    let end = new Date(this.endDate);
    const diffTime = end.getTime() - start.getTime();
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    for (let i = 0; i <= diffDays; i++) {
      let addDate = new Date(start.getTime() + 1000 * 60 * 60 * 24 * i);
      this.xData.push(addDate.toLocaleDateString());
      this.yDataRides.push(0);
      this.yDataDistance.push(0);
      this.yDataPrice.push(0);
    }
  }

  getDrives() {
    this.checkDates();
    let role = sessionStorage.getItem('role');
    this.show = false;
    this.clearData();
    this.setDatesInChart();
    if (role === 'ROLE_client') {
      this.getClientDrives();
    } else if (role === 'ROLE_admin') {
      this.getAdminDrives();
    } else if (role === 'ROLE_driver') {
      this.getDriverDrives();
    }
  }

  checkDates() {
    let start = new Date(this.startDate);
    let end = new Date(this.endDate);
    if (end < start) {
      this.alertService.errorAlert('Start date must be before end!');
    }
  }

  getAdminDrives() {
    this.driveService
      .getDrivesByDate(new Report(this.startDate, this.endDate))
      .subscribe((data) => {
        this.drives = data;
        this.setNumberOfDrives(data);
        this.setNumberOfKilometers(data);
        this.setPrice(data);
        this.show = true;
      });
  }

  getClientDrives() {
    this.driveService
      .getClientDrivesByDate(new Report(this.startDate, this.endDate))
      .subscribe((data) => {
        this.drives = data;
        this.setNumberOfDrives(data);
        this.setNumberOfKilometers(data);
        this.setPriceForClient(data);
        this.show = true;
      });
  }

  getDriverDrives() {
    this.driveService
      .getDriverDrivesByDate(new Report(this.startDate, this.endDate))
      .subscribe((data) => {
        this.drives = data;
        this.setNumberOfDrives(data);
        this.setNumberOfKilometers(data);
        this.setPrice(data);
        this.show = true;
      });
  }

  clearData() {
    this.ridesSum = 0;
    this.distanceSum = 0;
    this.priceSum = 0;

    this.xData = [];
    this.yDataRides = [];
    this.yDataDistance = [];
    this.yDataPrice = [];
  }

  setNumberOfDrives(drives: Drive[]) {
    for (let d of drives) {
      let index = this.getIndex(d);
      this.yDataRides[index] += 1;
      this.ridesSum += 1;
    }
  }

  setNumberOfKilometers(drives: Drive[]) {
    for (let d of drives) {
      let index = this.getIndex(d);
      this.yDataDistance[index] += d.distance;
      this.distanceSum += d.distance;
    }
  }

  setPriceForClient(drives: Drive[]) {
    let email = sessionStorage.getItem('username');
    for (let d of drives) {
      let index = this.getIndex(d);
      for (let p of d.passengers) {
        if (p.email === email) {
          this.yDataPrice[index] += p.price;
          this.priceSum += p.price;
        }
      }
    }
  }

  setPrice(drives: Drive[]) {
    for (let d of drives) {
      let index = this.getIndex(d);
      this.yDataPrice[index] += d.price;
      this.priceSum += d.price;
    }
  }

  getIndex(d: Drive): number {
    let comp = d.startTime.toString().split(',');
    let driveDate = new Date(
      parseFloat(comp[0]),
      parseFloat(comp[1]) - 1,
      parseFloat(comp[2])
    );
    return this.xData.indexOf(driveDate.toLocaleDateString());
  }
}
