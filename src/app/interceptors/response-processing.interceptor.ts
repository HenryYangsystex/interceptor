import { Injectable } from '@angular/core';
import {
  HttpEvent,
  HttpInterceptor,
  HttpHandler,
  HttpRequest,
  HttpResponse,
} from '@angular/common/http';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';

@Injectable()
export class ResponseProcessingInterceptor implements HttpInterceptor {
  intercept(
    req: HttpRequest<any>,
    next: HttpHandler,
  ): Observable<HttpEvent<any>> {
    return next.handle(req).pipe(
      tap(
        (event) => {
          if (event instanceof HttpResponse) {
            // 處理response
            console.log('API call successful:', event);

            // 檢查error code
            if (event.status === 200) {
              console.log('Request was successful:', event.body);
            }
          }
        },
        (error) => {
          // 處理錯誤
          console.error('API call failed:', error);
        },
      ),
    );
  }
}
