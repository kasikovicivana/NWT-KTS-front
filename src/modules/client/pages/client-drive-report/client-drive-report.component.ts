import { Component, OnInit } from '@angular/core';
import { DriveService } from '../../../shared/services/drive-service/drive.service';
import { Report } from '../../../app/model/report.model';
import { Drive } from '../../../app/model/drive.model';

@Component({
  selector: 'app-client-drive-report',
  templateUrl: './client-drive-report.component.html',
  styleUrls: ['./client-drive-report.component.css'],
})
export class ClientDriveReportComponent implements OnInit {
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

  constructor(public driveService: DriveService) {}

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
    this.setDatesInChart();
    this.driveService
      .getClientDrivesByDate(new Report(this.startDate, this.endDate))
      .subscribe((data) => {
        this.drives = data;
        this.setNumberOfDrives(data);
        this.setNumberOfKilometers(data);
        this.setPrice(data);
      });
  }

  setNumberOfDrives(drives: Drive[]) {
    for (let d of drives) {
      let index = this.getIndex(d);
      this.yDataRides[index] += 1;
    }
    this.ridesSum = this.yDataRides.reduce((a, b) => a + b, 0);
  }

  setNumberOfKilometers(drives: Drive[]) {
    for (let d of drives) {
      let index = this.getIndex(d);
      this.yDataDistance[index] += d.distance;
    }
    this.distanceSum = this.yDataDistance.reduce((a, b) => a + b, 0);
  }

  setPrice(drives: Drive[]) {
    let email = sessionStorage.getItem('username');
    for (let d of drives) {
      let index = this.getIndex(d);
      for (let p of d.passengers) {
        if (p.email === email) {
          this.yDataPrice[index] += p.price;
        }
      }
    }
    this.priceSum = this.yDataPrice.reduce((a, b) => a + b, 0);
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
