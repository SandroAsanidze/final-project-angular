import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

export interface Weather {
  main: {
    humidity:number;
    temp:number;
  };
  name:string;
  weather:[
    {
      description:string;
      main:string;
    }
  ];
  wind: {
    speed:number;
  };
}

@Injectable({
  providedIn: 'root'
})
export class WeatherService {

  constructor(private http:HttpClient) { }
  APIkey = 'aba09526722cb0d5c860492573a98768';

  getWeatherData(city:string):Observable<Weather> {
    return this.http.get<Weather>(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${this.APIkey}`);
  }
}