import { bootstrapApplication } from '@angular/platform-browser';
import { AppComponent } from './app/app.component';
import {provideRouter } from '@angular/router';
import { ROUTE } from './app/app.route';

bootstrapApplication(AppComponent,{
  providers: [provideRouter(ROUTE)]
})