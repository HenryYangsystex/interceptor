import {
  HttpInterceptor,
  HttpRequest,
  HttpHandler,
  HttpEvent,
} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AuthInterceptorService implements HttpInterceptor {
  intercept(
    req: HttpRequest<any>,
    next: HttpHandler,
  ): Observable<HttpEvent<any>> {
    const authToken = 'token_code';

    // 複製request加上token和header
    const authReq = req.clone({
      setHeaders: {
        Authorization: `Bearer ${authToken}`,
        'Custom-Header': 'CustomValue',
      },
    });
    return next.handle(authReq);
  }
}
