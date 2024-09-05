import { Injectable } from '@angular/core';
import {
  HttpInterceptor,
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpResponse,
} from '@angular/common/http';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';

@Injectable()
export class ResponseTimeLoggingInterceptor implements HttpInterceptor {
  intercept(
    req: HttpRequest<any>,
    next: HttpHandler,
  ): Observable<HttpEvent<any>> {
    const startTime = Date.now(); // 起始時間

    return next.handle(req).pipe(
      tap((event) => {
        if (event instanceof HttpResponse) {
          const elapsedTime = Date.now() - startTime; // 計算時間
          console.log(
            `Request for ${req.urlWithParams} took ${elapsedTime} ms.`,
          );
        }
      }),
    );
  }
}
