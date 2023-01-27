import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from '../../../../environments/environment';
import { LoginService } from '../../../app/service/login-service/login.service';

@Injectable({
  providedIn: 'root',
})
export class TokensService {
  accessToken: string = '';
  paypalUrl = 'https://api-m.sandbox.paypal.com';
  systemUrl = environment.backendUrl + 'api/system';
  client_id =
    'AaL655ha8QTdGmmG9nlZet4skeJJY-4Y11mVjItBQJSNqy_AcmA-h8ZFTaWtx0aDByaeMAxZMPof8HVR';
  client_secret =
    'EPMOwIdFjIYRnK24CM0qNmvbtR9ECpqr7DKTy7vWCouLzYnpSZfeISZxjdFevaZLn6nnXqN43W7b5aRR';

  constructor(private _http: HttpClient, private loginService: LoginService) {
    let context = this;
    this.generateAccessToken().subscribe({
      next: (data) => {
        context.accessToken = data['access_token'];
      },
    });
  }

  purchase(token: string, price: number) {
    const newUrl = this.paypalUrl + '/v2/checkout/orders';
    const header = new HttpHeaders({
      'Content-Type': 'application/json',
      Authorization: `Bearer ` + token,
    });
    const body = {
      intent: 'CAPTURE',
      application_context: {
        return_url: 'http://localhost:4200/confirmPayment',
      },
      purchase_units: [
        {
          amount: {
            currency_code: 'USD',
            value: price,
          },
        },
      ],
    };
    return this._http.post<any>(newUrl, body, { headers: header });
  }

  pay(token: string, orderId: string) {
    const payUrl = this.paypalUrl + `/v2/checkout/orders/${orderId}/capture`;
    const header = new HttpHeaders({
      'Content-Type': 'application/json',
      Authorization: `Bearer ` + token,
    });
    return this._http.post<any>(payUrl, {}, { headers: header });
  }

  getOrderDetails(token: string, orderId: string) {
    const payUrl = this.paypalUrl + `/v2/checkout/orders/${orderId}`;
    const header = new HttpHeaders({
      'Content-Type': 'application/json',
      Authorization: `Bearer ` + token,
    });

    return this._http.get<any>(payUrl, { headers: header });
  }

  generateAccessToken() {
    const newUrl = this.paypalUrl + '/v1/oauth2/token';
    const header = new HttpHeaders({
      'Content-Type': 'application/x-www-form-urlencoded',
      Authorization: `Basic ` + btoa(this.client_id + ':' + this.client_secret),
    });
    const body = new URLSearchParams({
      grant_type: 'client_credentials',
    }).toString();

    return this._http.post<any>(newUrl, body, {
      headers: header,
    });
  }

  getTokenPrice() {
    const payUrl = this.systemUrl + `/getTokenPrice`;
    return this._http.get<any>(payUrl);
  }
}
