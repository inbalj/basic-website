import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { WeatherFormComponent } from '../weather-form/weather-form.component';
import { Country } from '../../shared/models/country';
import { City } from '../../shared/models/city';


@Component({
  selector: 'page',
  standalone: true,
  imports: [CommonModule, WeatherFormComponent],
  templateUrl: './page.component.html',
  styleUrl: './page.component.scss'
})
export class PageComponent implements OnInit{

  title: string = "Tel Aviv";

  weatherData : any;
  constructor(){}

  ngOnInit(): void {
    this.weatherData = {
      main : {},
      isDay: true
    };
    this.getTodayWeatherData();
    //this.getFormWeatherData();
  }

  setTitle(address : string){
    this.title = address;
  }

  getTodayWeatherData(){
    fetch("https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/tel%20aviv/today?unitGroup=metric&include=current&key=6USUUHESZ2GF6GQZCQGDYXQ2X")
      .then(response=>response.json())
      .then(data=>{this.setWeatherData(data);})
  }

  getFormWeatherData(){

    let country = "Israel";
    let city = "Jerusalem";

    fetch("https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/"+ country + "+" + city + "/today?unitGroup=metric&include=current&key=6USUUHESZ2GF6GQZCQGDYXQ2X")
    .then(response=>response.json())
    .then(data=>{this.setWeatherData(data);})
  }



  setWeatherData(data : any){
    console.log( data.resolvedAddress);

    this.weatherData = data;
    this.setTitle(data.address);
    this.weatherData.isDay = this.weatherData.currentConditions.datetimeEpoch < this.weatherData.currentConditions.sunsetEpoch;
    this.weatherData.tempCelcius = this.weatherData.currentConditions.temp;
    this.weatherData.tempMin = this.weatherData.days[0].tempmin;
    this.weatherData.tempMax = this.weatherData.days[0].tempmax;
    this.weatherData.humidity = this.weatherData.currentConditions.humidity;
    this.weatherData.feelLike = this.weatherData.currentConditions.feelslike;
    this.weatherData.isCloudy = (this.weatherData.currentConditions.condition == 'cloudy')? true : false; //this.weatherData.currentConditions.icon;
  }

}
