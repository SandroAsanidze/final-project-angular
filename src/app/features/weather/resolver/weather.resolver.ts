import { inject } from '@angular/core';
import { ResolveFn } from '@angular/router';
import { WeatherService } from '../service/weather.service';
import { catchError, of } from 'rxjs';

export const weatherResolver: ResolveFn<any> = (route, state,weatherService = inject(WeatherService)) => weatherService.getWeatherData('tbilisi').pipe(
  catchError((err) => {
    return of('No data' + err);
  })
);
