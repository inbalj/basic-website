import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, FormGroup, ReactiveFormsModule, FormBuilder, Validators, FormControl} from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatFormFieldModule } from '@angular/material/form-field';
import { of, startWith, switchMap, tap } from "rxjs";
import { WeatherService } from '../../shared/services/WeatherService';
import { Country } from '../../shared/models/country';
import { City } from '../../shared/models/city';
import { HttpClientModule } from "@angular/common/http";



@Component({
  selector: 'weather-form',
  standalone: true,
  imports: [CommonModule, FormsModule, ReactiveFormsModule, FormsModule,
    MatFormFieldModule, HttpClientModule,
    MatSelectModule,
    MatInputModule],
  templateUrl: './weather-form.component.html',
  styleUrl: './weather-form.component.scss'
})
export class WeatherFormComponent{
  chosenCountry! : Country;
  chosenCity! : City;

  //weatherForm!: FormGroup;


  countryControl =  new FormControl<Country | null>(null);
  cityControl = new FormControl<City | null>(null);

  constructor(private weather: WeatherService) {}

  // Observables for the dropdown options
	countries = this.weather.getCountries();

  cities = this.countryControl.valueChanges.pipe(
		startWith(this.countryControl.value),
		switchMap((country) => {
			if (!country) {
				return of([]);
			} else {
				return this.weather.getCitiesByCountry(country).pipe(
					tap((cities) => {
						if (cities.length == 0) {
							alert("No Cities Data Found.");
						}
					})
				);
			}
		})
	);

  onSubmit(){
    this.cityControl.value
    console.log(this.countryControl.value?.name + ' , ' + this.cityControl.value?.name);
   }


 }

