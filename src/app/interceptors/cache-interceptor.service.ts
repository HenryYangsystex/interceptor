import {
  HttpInterceptor,
  HttpResponse,
  HttpRequest,
  HttpHandler,
  HttpEvent,
} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of, tap } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class CacheInterceptorService implements HttpInterceptor {
  private cache = new Map<string, HttpResponse<any>>();

  intercept(
    req: HttpRequest<any>,
    next: HttpHandler,
  ): Observable<HttpEvent<any>> {
    if (req.method !== 'GET') {
      return next.handle(req);
    }

    // 檢查cache有沒有url
    const cachedResponse = this.cache.get(req.url);

    if (cachedResponse) {
      // 檢查有沒有cache
      console.log('cache exists');
      return of(cachedResponse.clone());
    }

    // 沒有cache就呼叫
    return next.handle(req).pipe(
      tap((event) => {
        if (event instanceof HttpResponse) {
          this.cache.set(req.url, event.clone()); //暫存response
          console.log('cache here');
          console.log(this.cache);
        }
      }),
    );
  }
}
