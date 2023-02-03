import { Component, OnInit } from '@angular/core';
import { TokensService } from '../../services/tokens-service/tokens.service';
import { Client } from '../../../app/model/client.model';
import { AlertsService } from '../../../shared/services/alerts-service/alerts.service';
import { UserService } from '../../../shared/services/user-service/user.service';

@Component({
  selector: 'app-purchase-tokens',
  templateUrl: './purchase-tokens.component.html',
  styleUrls: ['./purchase-tokens.component.css'],
})
export class PurchaseTokensComponent implements OnInit {
  client: Client = new Client();
  token = 0;
  tokenPrice = 0.0;

  constructor(
    private tokenService: TokensService,
    private profileViewService: UserService,
    private alertsService: AlertsService
  ) {}

  ngOnInit(): void {
    this.profileViewService.getLoggedClient().subscribe((data) => {
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
