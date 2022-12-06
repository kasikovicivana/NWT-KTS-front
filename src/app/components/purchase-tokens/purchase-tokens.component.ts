import { Component, OnInit } from '@angular/core';
import { TokensService } from '../../service/tokens.service';
import { ProfileViewService } from '../../service/profile-view.service';
import { Client } from '../../model/client.model';
import { AlertsService } from '../../service/alerts.service';

@Component({
  selector: 'app-purchase-tokens',
  templateUrl: './purchase-tokens.component.html',
  styleUrls: ['./purchase-tokens.component.css'],
})
export class PurchaseTokensComponent implements OnInit {
  constructor(
    private tokenService: TokensService,
    private profileViewService: ProfileViewService,
    private alertsService: AlertsService
  ) {}

  client: Client = new Client();
  token: number = 0;
  tokenPrice: number = 0.0;

  ngOnInit(): void {
    this.profileViewService.getLoggedUserInfo().subscribe((data) => {
      this.client = data;
    });
    this.tokenService.getTokenPrice().subscribe((data) => {
      this.tokenPrice = data;
    });
  }

  purchase(): void {
    if (this.token == 0.0) {
      this.alertsService.errorAlertCustomMessage(
        'Tokens number must be greater than 0.'
      );
      return;
    }
    this.tokenService
      .purchase(this.tokenService.accessToken, this.token * this.tokenPrice)
      .subscribe({
        next: (data) => {
          window.location.href = data['links'][1]['href'];
        },
      });
  }
}
