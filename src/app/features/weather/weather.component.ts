import { ChangeDetectionStrategy, ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { WeatherService } from './service/weather.service';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { Weather } from 'src/app/shared/interfaces/weather.interface';

@Component({
  selector: 'app-weather',
  standalone: true,
  imports: [CommonModule,HttpClientModule,FormsModule,RouterModule],
  providers:[WeatherService],
  templateUrl: './weather.component.html',
  styleUrls: ['./weather.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class WeatherComponent implements OnInit {
  weatherData: Weather | undefined;
  city:string='tbilisi'
  today : Date = new Date();
  errorMessage:string='';

  constructor(
    private activatedRoute:ActivatedRoute,
    private cdr:ChangeDetectorRef,
    private weatherService:WeatherService,
    private router:Router
  ){}
  ngOnInit(): void {
    this.getWeather(this.city);
    this.activatedRoute.data.subscribe((m:any) => {
      this.weatherData = m.routeResolver;
    })
  }

  KelvinToCelsius(kelvin: number): number {
    return Math.ceil(kelvin - 273.15);
  }

  getWeather(city:string) {
    if(city === '') {
      return;
    }
    this.weatherService.getWeatherData(city).subscribe(data => {
      this.weatherData = data;
      this.cdr.detectChanges();
    },(error) => {
      this.errorMessage = error;
    })
  }

  backToHome(){
    this.router.navigate(['home'])
  }
}
