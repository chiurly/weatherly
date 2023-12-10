import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';
import { Weather } from '../models/weather.model';

@Injectable({ providedIn: 'root' })
export class WeatherService {
	constructor(private http: HttpClient) { }

	public getWeather(location: string): Observable<Weather> {
		let params = new HttpParams()
			.set('key', environment.weatherApiKey)
			.set('q', location);

		return this.http.get<Weather>(
			environment.weatherApiUrl,
			{ params }
		);
	}
}
