import { Component,OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { WeatherFormComponent } from '../weather-form/weather-form.component';
import { WeatherForecastComponent } from '../weather-forecast/weather-forecast.component';
import { WeatherWidgetComponent } from '../weather-widget/weather-widget.component';
import { WeatherService } from '../../shared/services/WeatherService';


@Component({
  selector: 'page',
  standalone: true,
  imports: [CommonModule, WeatherFormComponent, WeatherForecastComponent, WeatherWidgetComponent],
  templateUrl: './page.component.html',
  styleUrl: './page.component.scss'
})


export class PageComponent implements OnInit{

//pass it to child components
  choosenCity : any = "Tel Aviv";
  choosenCountry : any = "Israel";
  weatherData: any = {};

  constructor(private weatherService: WeatherService) {}

  ngOnInit() {
    // subscribe to the weather service to get updates on changes
    //in the submitted data on the weatherForm
    this.weatherService.weatherData$.subscribe(data => {
      this.weatherData = data;
    });
  }


// get city from the child component - weatherForm
  setChoosenCityAndCountry(choosenCity : any, choosenCountry : any){
    this.choosenCity = choosenCity;
    this.choosenCountry = choosenCountry;
  }

}

