import { CommonModule } from '@angular/common';
import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterOutlet } from '@angular/router';
import { Weather } from './models/weather.model';
import { WeatherService } from './services/weather.service';

@Component({
	selector: 'app-root',
	standalone: true,
	imports: [CommonModule, RouterOutlet, FormsModule],
	templateUrl: './app.component.html',
	styleUrl: './app.component.css',
})
export class AppComponent implements OnInit {
	locationInput = '';
	weather?: Weather;

	constructor(private weatherService: WeatherService) { }

	ngOnInit(): void {
		this.loadWeather('Vilnius');
	}

	onSearch() {
		this.locationInput = this.locationInput.trim();

		if (this.locationInput.length == 0) {
			return alert('Location must not be empty');
		}

		this.loadWeather(this.locationInput);
	}

	loadWeather(location: string) {
		this.weatherService.getWeather(location).subscribe({
			next: (weather: Weather) => {
				this.weather = weather;
				this.locationInput = '';
			},
			error: (err: HttpErrorResponse) => {
				alert(err.error.error.message);
			},
		});
	}
}
