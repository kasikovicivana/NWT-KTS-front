import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor, HttpHeaders,
} from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable()
export class Interceptor implements HttpInterceptor {
	intercept(
		req: HttpRequest<any>,
		next: HttpHandler
	): Observable<HttpEvent<any>> {

    //
    // return new HttpHeaders({
    //   'Content-Type': 'application/json',
    //   'Access-Control-Allow-Origin': '*',
    //   Authorization: `Bearer ` + sessionStorage.getItem('accessToken'),
    // });
    // //
		const item = sessionStorage.getItem('accessToken')
		//yzyconst authToken = `Bearer ` + item
    console.log("ulazi")
		if (item) {
      console.log('treba da azuriraa')
			const cloned = req.clone({
				headers: new HttpHeaders({
          'Content-Type': 'application/json',
          'Access-Control-Allow-Origin': '*',
          Authorization: `Bearer ` + sessionStorage.getItem('accessToken'),
        }),
			});

			return next.handle(cloned);
		} else {
			return next.handle(req);
		}
	}
}
