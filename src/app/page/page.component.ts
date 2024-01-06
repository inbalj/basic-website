import { Component,OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { WeatherFormComponent } from '../weather-form/weather-form.component';
import { WeatherForecastComponent } from '../weather-forecast/weather-forecast.component';
import { WeatherWidgetComponent } from '../weather-widget/weather-widget.component';



@Component({
  selector: 'page',
  standalone: true,
  imports: [CommonModule, WeatherFormComponent, WeatherForecastComponent, WeatherWidgetComponent],
  templateUrl: './page.component.html',
  styleUrl: './page.component.scss'
})


export class PageComponent {

//pass it to child components
  choosenCity = "Tel Aviv";
  choosenCountry = "Israel"




// get city from the child component - weatherForm
setChoosenCityAndCountry(choosenCity : any, choosenCountry : any){
  this.choosenCity = choosenCity;
  this.choosenCountry = choosenCountry;
}

}

