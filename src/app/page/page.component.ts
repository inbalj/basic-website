import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';


@Component({
  selector: 'page',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './page.component.html',
  styleUrl: './page.component.scss'
})
export class PageComponent implements OnInit{

  weatherData:any;
  constructor(){}

  ngOnInit(): void {
    this.weatherData = {
      main : {},
      isDay: true
    };
    this.getWeatherData();
    console.log(this.getWeatherData());
  }

  getWeatherData(){
    fetch("https://api.openweathermap.org/data/2.5/weather?q=tel+aviv&appid=7a8ceb0e6c5be276bbf7123eff1b0355")
      .then(response=>response.json())
      .then(data=>{this.setWeatherData(data);})
    //let data = JSON.parse('[{"coord": {"lon": 48.570728,"lat": 34.790878},"country": "IR","geoname": {"cl": "P","code": "PPL", "parent": 132142} ]');
    //this.setWeatherData(data);
  }

  setWeatherData(data : any){
    this.weatherData = data;
    let sunsetTime = new Date(this.weatherData.sys.sunset * 1000);
    this.weatherData.sunset_time = sunsetTime.toLocaleTimeString();
    let currentDate = new Date();
    this.weatherData.isDay = (currentDate.getTime() < sunsetTime.getTime());
    this.weatherData.temp_celcius = (this.weatherData.main.temp - 273.15).toFixed(0);
    this.weatherData.temp_min = (this.weatherData.main.temp_min - 273.15).toFixed(0);
    this.weatherData.temp_max = (this.weatherData.main.temp_max - 273.15).toFixed(0);
  }

}
