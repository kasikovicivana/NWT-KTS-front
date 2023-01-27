import { Component, OnInit } from '@angular/core';
import { DriverCarInfo } from '../../../app/model/driver.model';
import { UserService } from '../../../shared/services/user-service/user.service';

@Component({
  selector: 'app-review-driver-changes',
  templateUrl: './review-driver-changes.component.html',
  styleUrls: ['./review-driver-changes.component.css'],
})
export class ReviewDriverChangesComponent implements OnInit {
  pageSize: number;
  currentPage: number;
  totalSize: number;

  reviews: [DriverCarInfo] | undefined;

  constructor(private userService: UserService) {
    this.pageSize = 4;
    this.currentPage = 1;
    this.totalSize = 0;
  }

  ngOnInit(): void {
    this.getReviews(0);
  }

  getReviews(page: number): void {
    this.userService
      .getPendingDriverChanges(page, this.pageSize)
      .subscribe((data) => {
        this.reviews = data.body;
        this.totalSize = Number(data.headers.get('total-items'));
      });
  }

  changePage(newPage: number): void {
    this.currentPage = newPage;
    this.getReviews(newPage - 1);
  }
}
