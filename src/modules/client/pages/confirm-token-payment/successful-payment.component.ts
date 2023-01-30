import { Component, OnInit } from '@angular/core';
import { TokensService } from '../../services/tokens-service/tokens.service';
import { Router } from '@angular/router';
import { PayingInfoModel } from '../../../app/model/payingInfo.model';
import { Client } from '../../../app/model/client.model';
import { AlertsService } from '../../../shared/services/alerts-service/alerts.service';
import { UserService } from '../../../shared/services/user-service/user.service';

@Component({
  selector: 'app-confirm-token-payment',
  templateUrl: './successful-payment.component.html',
  styleUrls: ['./successful-payment.component.css'],
})
export class SuccessfulPaymentComponent implements OnInit {
  token: string = '';
  tokenPrice: number = 0.0;
  id: string = '';
  payingSources: PayingInfoModel = {
    payingSource: 'unknown',
    amount: 0.0,
    currency: 'USD',
  };
  client: Client = new Client();

  constructor(
    private tokenService: TokensService,
    private alertsService: AlertsService,
    private router: Router,
    private profileViewService: UserService,
    private userService: UserService
  ) {}

  ngOnInit(): void {
    const urlParams = new URLSearchParams(window.location.search);
    const id = urlParams.get('token');
    if (id != null) {
      this.id = id;
      let context = this;
      this.tokenService.generateAccessToken().subscribe({
        next: (data) => {
          context.token = data['access_token'];
          context.tokenService
            .getOrderDetails(data['access_token'], id)
            .subscribe({
              next: (data) => {
                console.log(data);
                console.log('kao izdvaja info sadaa');
                this.getPayingInfo(data);
              },
            });
        },
      });
    }
  }

  cancel() {
    this.router.navigateByUrl('/purchaseTokens').then();
  }

  confirm() {
    this.tokenService.getTokenPrice().subscribe({
      next: (data) => {
        this.tokenPrice = data;
      },
    });
    this.tokenService.pay(this.token, this.id).subscribe({
      next: async () => {
        this.profileViewService.getLoggedClient().subscribe((data) => {
          this.client = data;
          if (this.payingSources.amount != 0.0) {
            this.client.tokens += this.payingSources.amount / this.tokenPrice;
          }
          this.userService.saveClient(this.client).subscribe();
        });
        this.alertsService.successAlert();
        await this.delay(800);
        this.router.navigateByUrl('/purchaseTokens').then(() => {
          window.location.reload();
        });
      },
    });
  }

  private getPayingInfo(data: any) {
    this.payingSources.payingSource = 'paypal';
    this.payingSources.amount = data['purchase_units'][0]['amount']['value'];
    this.payingSources.currency =
      data['purchase_units'][0]['amount']['currency_code'];
  }

  private delay(ms: number) {
    return new Promise((resolve) => setTimeout(resolve, ms));
  }
}
