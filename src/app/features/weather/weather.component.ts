import { ChangeDetectionStrategy, ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { WeatherService } from './service/weather.service';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-weather',
  standalone: true,
  imports: [CommonModule,HttpClientModule,FormsModule],
  providers:[WeatherService],
  templateUrl: './weather.component.html',
  styleUrls: ['./weather.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class WeatherComponent implements OnInit {
  weatherData:any;
  city:string='tbilisi'
  today : Date = new Date();

  constructor(private cdr:ChangeDetectorRef,private weatherService:WeatherService){}
  ngOnInit(): void {
    this.getWeather(this.city);
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
    })
  }
}
