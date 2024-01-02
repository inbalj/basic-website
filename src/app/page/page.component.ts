import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { WeatherFormComponent } from '../weather-form/weather-form.component';
import { WeatherForecastComponent } from '../weather-forecast/weather-forecast.component';


const API_KEY = '6USUUHESZ2GF6GQZCQGDYXQ2X';

@Component({
  selector: 'page',
  standalone: true,
  imports: [CommonModule, WeatherFormComponent, WeatherForecastComponent],
  templateUrl: './page.component.html',
  styleUrl: './page.component.scss'
})


export class PageComponent implements OnInit{

  title: string = "Tel Aviv";
  city : string = "Tel Aviv";
  country: string = '';

  weatherData : any;
  constructor(){}

  ngOnInit(): void {
    this.weatherData = {
      main : {},
      isDay: true
    };
    this.getTodayWeatherData();
  }

  setTitle(city : string){
    this.title = city;
  }

  getTodayWeatherData(){
    fetch("https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/tel%20aviv/today?unitGroup=metric&include=current&key=" + API_KEY)
      .then(response=>response.json())
      .then(data=>{this.setWeatherData(data);})
  }

  getFormWeatherData(){

    fetch("https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/"+ this.country + "+" + this.city + "/today?unitGroup=metric&include=current&key=" + API_KEY)
    .then(response=>response.json())
    .then(data=>{this.setWeatherData(data);})
  }

  setWeatherData(data : any){

    this.weatherData = data;
    this.setTitle(this.city);
    this.weatherData.isDay = this.weatherData.currentConditions.datetimeEpoch < this.weatherData.currentConditions.sunsetEpoch;
    this.weatherData.tempCelcius = this.weatherData.currentConditions.temp;
    this.weatherData.tempMin = this.weatherData.days[0].tempmin;
    this.weatherData.tempMax = this.weatherData.days[0].tempmax;
    this.weatherData.humidity = this.weatherData.currentConditions.humidity;
    this.weatherData.feelLike = this.weatherData.currentConditions.feelslike;
    this.weatherData.isCloudy = (this.weatherData.currentConditions.condition == 'cloudy')? true : false;
    this.weatherData.isRainy = (this.weatherData.currentConditions.condition == 'Rain')? true : false;
  }

  receiveData(data: { choosenCity: any, choosenCountry: any }) {
     this.city = data.choosenCity;
     this.country = data.choosenCountry;
     this.getFormWeatherData();
  }


}

