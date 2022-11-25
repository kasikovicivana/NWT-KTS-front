import { Component, OnInit } from '@angular/core';
import { AlertsService } from '../../service/alerts.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-password-change',
  templateUrl: './password-change.component.html',
  styleUrls: ['./password-change.component.css'],
})
export class PasswordChangeComponent implements OnInit {
  token: string = '';

  constructor(private alerts: AlertsService, private route: ActivatedRoute) {}

  ngOnInit(): void {
    this.token = this.route.snapshot.params['token'];
  }
}
