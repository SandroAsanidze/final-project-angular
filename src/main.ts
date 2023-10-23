import { bootstrapApplication } from '@angular/platform-browser';
import { AppComponent } from './app/app.component';
import {provideRouter } from '@angular/router';
import { ROUTE } from './app/app.route';
import { importProvidersFrom } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';

bootstrapApplication(AppComponent,{
  providers: [provideRouter(ROUTE),importProvidersFrom(HttpClientModule)]
})