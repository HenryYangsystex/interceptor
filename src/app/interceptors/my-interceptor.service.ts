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
export class MyInterceptorService implements HttpInterceptor {
  intercept(
    req: HttpRequest<any>,
    next: HttpHandler,
  ): Observable<HttpEvent<any>> {
    // Check if the request URL is for a local file
    if (req.url.startsWith('assets/')) {
      // You can modify the request or handle it differently if needed
      console.log('Intercepting request for local file:', req.url);

      // Example: Add a custom header for local file requests
      const modifiedRequest = req.clone({
        headers: req.headers.set('Custom-Header', 'ValueForLocalFile'),
      });

      return next.handle(modifiedRequest);
    }

    // For other requests, just pass through unmodified
    return next.handle(req);
  }
}
