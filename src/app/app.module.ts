import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { MyInterceptorService } from './interceptors/my-interceptor.service';
import { Example1Component } from './features/example1/example1.component';
import { AuthInterceptorService } from './interceptors/auth-interceptor.service';
import { CacheInterceptorService } from './interceptors/cache-interceptor.service';
import { PollingInterceptor } from './interceptors/polling.interceptor';
import { ResponseProcessingInterceptor } from './interceptors/response-processing.interceptor';
import { ResponseTimeLoggingInterceptor } from './interceptors/response-time-logging.interceptor';

@NgModule({
  declarations: [AppComponent, Example1Component],
  imports: [BrowserModule, AppRoutingModule, HttpClientModule],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: MyInterceptorService,
      multi: true,
    },
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptorService,
      multi: true,
    },
    {
      provide: HTTP_INTERCEPTORS,
      useClass: CacheInterceptorService,
      multi: true,
    },
    // {
    //   provide: HTTP_INTERCEPTORS,
    //   useClass: PollingInterceptor,
    //   multi: true,
    // },
    {
      provide: HTTP_INTERCEPTORS,
      useClass: ResponseProcessingInterceptor,
      multi: true,
    },
    {
      provide: HTTP_INTERCEPTORS,
      useClass: ResponseTimeLoggingInterceptor,
      multi: true,
    },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
