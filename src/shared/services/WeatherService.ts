import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { map, Observable } from "rxjs";
import { City } from "../models/city";
import { Country } from "../models/country";

@Injectable({
	providedIn: "root",
})

export class WeatherService {

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

}