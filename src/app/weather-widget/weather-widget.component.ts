import { Component, OnInit, Input, Output, EventEmitter} from '@angular/core';
import { CommonModule } from '@angular/common';
import { WeatherFormComponent } from '../weather-form/weather-form.component';
import { WeatherForecastComponent } from '../weather-forecast/weather-forecast.component';
import { WeatherService } from '../../shared/services/WeatherService';

const API_KEY = '6USUUHESZ2GF6GQZCQGDYXQ2X';


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


  weatherData : any;

  constructor(private weatherService: WeatherService) {}

  ngOnInit(): void {
    this.weatherData = {
      main : {},
      isDay: true,
      isCloudy: false,
      isRainy: false
    };
    this.getTodayWeatherData();
    // subscribe to the weatherService to update the data according to the service
    this.weatherService.weatherData$.subscribe(data => {
      this.choosenCity = data.choosenCity;
      this.choosenCountry = data.choosenCountry;
      this.getFormWeatherData();
    });
  }


  // shows the default - Tel Aviv
  getTodayWeatherData(){
    fetch("https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/tel%20aviv/today?unitGroup=metric&include=current&key=" + API_KEY)
      .then(response=>response.json())
      .then(data=>{this.setWeatherData(data);})
  }

  // change data according to the weatherForm
  getFormWeatherData(){
    fetch("https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/"+ this.choosenCountry + "+" + this.choosenCity + "/today?unitGroup=metric&include=current&key=" + API_KEY)
    .then(response=>response.json())
    .then(data=>{this.setWeatherData(data);})
  }

  setWeatherData(data : any){
    this.weatherData = data;
    this.weatherData.isDay = ((this.weatherData.currentConditions.datetimeEpoch < this.weatherData.currentConditions.sunsetEpoch)&&(this.weatherData.currentConditions.datetimeEpoch > this.weatherData.currentConditions.sunriseEpoch));
    this.weatherData.tempCelcius = this.weatherData.currentConditions.temp;
    this.weatherData.tempMin = this.weatherData.days[0].tempmin;
    this.weatherData.tempMax = this.weatherData.days[0].tempmax;
    this.weatherData.humidity = this.weatherData.currentConditions.humidity;
    this.weatherData.feelLike = this.weatherData.currentConditions.feelslike;
    this.weatherData.isCloudy = this.weatherData.currentConditions.conditions.includes('cloudy');
    this.weatherData.isRainy = this.weatherData.currentConditions.conditions.includes('Rain');
  }

}
