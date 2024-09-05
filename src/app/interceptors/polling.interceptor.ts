import { Injectable } from '@angular/core';
import {
  HttpEvent,
  HttpInterceptor,
  HttpHandler,
  HttpRequest,
} from '@angular/common/http';
import { Observable, timer } from 'rxjs';
import { switchMap, retryWhen, delayWhen } from 'rxjs/operators';

@Injectable()
export class PollingInterceptor implements HttpInterceptor {
  // 每一秒訪問一次
  private readonly pollingInterval = 1000;

  intercept(
    req: HttpRequest<any>,
    next: HttpHandler,
  ): Observable<HttpEvent<any>> {
    if (this.shouldPoll(req)) {
      console.log('polling');
      return timer(0, this.pollingInterval).pipe(
        switchMap(() => next.handle(req.clone())),
        retryWhen((errors) =>
          errors.pipe(
            delayWhen(() => timer(this.pollingInterval)), // 如果錯誤再呼叫一次
          ),
        ),
      );
    } else {
      return next.handle(req);
    }
  }

  private shouldPoll(req: HttpRequest<any>): boolean {
    // 額外的判斷式
    return req.url.includes('assets/file.json');
  }
}
