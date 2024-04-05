import { Component, OnInit, Input, Output, EventEmitter} from '@angular/core';
import { CommonModule } from '@angular/common';
import { WeatherFormComponent } from '../weather-form/weather-form.component';
import { WeatherForecastComponent } from '../weather-forecast/weather-forecast.component';
import { WeatherService } from '../../shared/services/WeatherService';
import { HttpClient } from '@angular/common/http';
import { WeatherData } from '../../shared/models/weatherdata.models';


const API_KEY = '';


@Component({
  selector: 'weather-widget',
  standalone: true,
  imports: [CommonModule, WeatherFormComponent, WeatherForecastComponent],
  templateUrl: './weather-widget.component.html',
  styleUrl: './weather-widget.component.scss'
})
export class WeatherWidgetComponent implements OnInit{

// passed from parent component - Page
  @Input() choosenCity : string = '';
  @Input() choosenCountry : string = '';


  weatherData! : WeatherData;
  errorMessage!: string;
  isDay = true;
  isCloudy = false;
  isRainy = false;
  constructor(private http:HttpClient, private weatherService: WeatherService) {}


  ngOnInit(): void {

    this.weatherService.getWeatherData(this.choosenCity,this.choosenCountry,false).subscribe({
      next: (data) => {
        this.setWeatherData( data );
      },
      error: (error) => {
        this.errorMessage = error;
      },
    });


    // subscribe to the weatherService to update the data according to the service
    this.weatherService.weatherData$.subscribe(data => {
      this.choosenCity = data.choosenCity;
      this.choosenCountry = data.choosenCountry;
      this.getFormWeatherData();
    });
  }

  // change data according to the weatherForm
  getFormWeatherData(){
    fetch("https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/"+ this.choosenCountry + "+" + this.choosenCity + "/today?unitGroup=metric&include=current&key=" + API_KEY)
    .then(response=>response.json())
    .then(data=>{this.setWeatherData(data);})
  }

  setWeatherData(data : any): void {

    this.weatherData = data;
    this.isDay = ((data.currentConditions.datetimeEpoch < data.currentConditions.sunsetEpoch) && (data.currentConditions.datetimeEpoch > data.currentConditions.sunriseEpoch));
    this.weatherData.temp = data.currentConditions.temp;
    this.weatherData.tempmin = data.days[0].tempmin;
    this.weatherData.tempmax = data.days[0].tempmax;
    this.weatherData.humidity = data.currentConditions.humidity;
    this.weatherData.feelslike = data.currentConditions.feelslike;
    this.isCloudy = data.days[0].conditions.includes('cloudy');
    this.isRainy = data.days[0].conditions.includes('Rain');
  }

}
