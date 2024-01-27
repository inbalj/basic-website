import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { map, Observable, Subject } from "rxjs";
import { Country } from "../models/country.models";
import { City } from "../models/city.models";
import { WeatherData } from "../models/weatherdata.models";

const API_KEY = '6USUUHESZ2GF6GQZCQGDYXQ2X';

@Injectable({
	providedIn: "root",
})

export class WeatherService {

	readonly WEATHER_URL = 'https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline';

	private weatherDataSubject = new Subject<any>();
  weatherData$ = this.weatherDataSubject.asObservable();
// method to update new data from weather-form
  updateWeatherData(newData: any) {
    this.weatherDataSubject.next(newData);
  }

  constructor(private http: HttpClient) {}

	// Method to get all countries
	getCountries(): Observable<Country[]> {
		return this.http.get<Country[]>("../../assets/country.json");
	}


	// Method to get cities by state name
	getCitiesByCountry(country: Country): Observable<City[]> {
		return this.http
			.get<City[]>(
				"../../assets/city.json")
			.pipe(
				map((cities) =>
					//Filtering due to passed static data
					cities.filter((city) => city.country_id === country.id)
				)
			);
	}

	// shows the default - Tel Aviv
	getWeatherData(): Observable <WeatherData[]> {
    return this.http.
		get<WeatherData[]>(
      this.WEATHER_URL +
      '/tel%20aviv/today?unitGroup=metric&include=current&key=' + API_KEY);
     }

}