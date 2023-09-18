import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { instantForecast } from './instantForecast.interface';
import { WeatherData } from './forecast.interface';

@Component({
  selector: 'app-course',
  templateUrl: './course.component.html',
  styleUrls: ['./course.component.css']
})
export class CourseComponent {
  inputText: string = '';
  apiUrl: string = 'https://api.openweathermap.org/data/2.5/weather?q={{inputPlaceholder}}&appid={{apiKey}}&units=imperial'
  forecastUrl: string = 'https://api.openweathermap.org/data/2.5/forecast?q={{inputPlaceholder}}&appid={{apiKey}}&units=imperial'
  apiKey: string = '21d11b007ade27ccee285312cfe144b9'
  instantForecast!: instantForecast;
  WeatherData!: WeatherData
  

  constructor(private http: HttpClient) {} // Inject HttpClient

  isObjectEmpty(obj: any): boolean {
    if (obj === null || obj === undefined) {
      return true; // Handle null or undefined objects
    }
    return Object.keys(obj).length === 0;
  }

  roundToWholeNumber(value: number): number {
    return Math.round(value);
  }

  sendData() {
    let cityUrl = this.apiUrl.replace('{{inputPlaceholder}}', this.inputText)
    let dynamicUrl = cityUrl.replace('{{apiKey}}', this.apiKey)
    this.http.get<instantForecast>(dynamicUrl).subscribe(
      (data) => {
        this.instantForecast = data
      },
      (error) => {
        // Handle any errors that occurred during the API request
        console.error('An error occurred:', error);
      }
    );
    cityUrl = this.forecastUrl.replace('{{inputPlaceholder}}', this.inputText)
    dynamicUrl = cityUrl.replace('{{apiKey}}', this.apiKey)
    this.http.get<WeatherData>(dynamicUrl).subscribe(
      (data) => {
        this.WeatherData = data
        console.log(this.WeatherData)
      },
      (error) => {
        console.error('An error occurred:', error)
      }
    )
  }
}
