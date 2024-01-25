import { Component, Input, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
//import { HttpClient } from '@angular/common/http';
import { WeatherService } from '../../shared/services/WeatherService';
import { WeatherData } from '../../shared/models/weatherdata.models';

const API_KEY = '6USUUHESZ2GF6GQZCQGDYXQ2X';


@Component({
  selector: 'weather-forecast',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './weather-forecast.component.html',
  styleUrl: './weather-forecast.component.scss'
})


export class WeatherForecastComponent implements OnInit {
// passed from parent component - Page
  @Input() choosenCity : string = '';
  @Input() choosenCountry : string = '';


  weatherData : WeatherData[]=[];

  headers = [
    "Date",
    "Temp",
    "Temp-min",
    "Temp-max",
    "Feels like",
    "Humidity",
    "Description",
    "Icon"
  ];

  constructor( private weatherService: WeatherService) {}

  ngOnInit(): void {
    this.getForecastFromToday();
    this.weatherService.weatherData$.subscribe(data => {
      this.choosenCity = data.choosenCity;
      this.choosenCountry = data.choosenCountry;
      this.getForecastFromToday();
    });

  }

  getForecastFromToday(){
    let today = new Date().toJSON().slice(0, 10); // today
    let fourDaysAhead = getDaysAhead(3);

    fetch("https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/"+
      this.choosenCity + "%20" + this.choosenCountry + "/" +
      today + "/"+ fourDaysAhead +"?unitGroup=metric&include=days%2Cfcst&key=" + API_KEY
      + "&contentType=json")
    .then(response=>response.json())
    .then(data=>{this.loadForecastData(data.days);})

  }

  loadForecastData(data: WeatherData[]): void {

    // Extract and assign properties directly to weatherData array
    this.weatherData = data.map((item) => ({
      datetime: item.datetime,
      temp: item.temp,
      tempmin: item.tempmin,
      tempmax: item.tempmax,
      feelslike: item.feelslike,
      humidity: item.humidity,
      conditions: item.conditions,
      icon: item.icon,
    }));
  }
}


function getDaysAhead(days : number) {
  // Get today's date as a Date object
  const today = new Date();
  today.setDate(today.getDate() + days);
  const fourDaysAhead = today.toISOString().slice(0, 10);

  return fourDaysAhead;
}
