import { bootstrapApplication } from '@angular/platform-browser';
import { AppComponent } from './app/app.component';
import {provideRouter } from '@angular/router';
import { ROUTE } from './app/app.route';
import { importProvidersFrom } from '@angular/core';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { LoaderInterceptor } from './app/core/interceptor/interceptor.service';

bootstrapApplication(AppComponent,{
  providers: [
    { provide:HTTP_INTERCEPTORS, useClass: LoaderInterceptor,multi: true},
    provideRouter(ROUTE),
    importProvidersFrom(HttpClientModule),
  ]
})