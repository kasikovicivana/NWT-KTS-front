import { Injectable } from '@angular/core';
import {
  HttpEvent,
  HttpHandler,
  HttpHeaders,
  HttpInterceptor,
  HttpRequest,
} from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable()
export class Interceptor implements HttpInterceptor {
  intercept(
    req: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    if (req.url.includes('https://api-m.sandbox.paypal.com')) {
      return next.handle(req);
    }

    if (req.url.includes('https://nominatim.openstreetmap.org/search?')) {
      const cloned = req.clone({
        headers: new HttpHeaders({
          'Access-Control-Allow-Origin': '*',
        }),
      });
      return next.handle(cloned);
    }

    if (
      req.url ==
        'https://api.openrouteservice.org/v2/directions/driving-car/geojson' ||
      req.url.includes(
        'https://api.openrouteservice.org/geocode/search/structured'
      )
    ) {
      return next.handle(req);
    }

    const item = sessionStorage.getItem('accessToken');
    if (item) {
      console.log('treba da azuriraa');
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
