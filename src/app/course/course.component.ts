import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { instantForecast } from './instantForecast.interface';
import { WeatherData } from './forecast.interface';
import { switchMap } from 'rxjs';

@Component({
  selector: 'app-course',
  templateUrl: './course.component.html',
  styleUrls: ['./course.component.css']
})
export class CourseComponent {
  inputText: string = '';
  apiUrl: string = 'https://api.openweathermap.org/data/2.5/weather?q={{inputPlaceholder}}&appid={{apiKey}}&units=imperial'
  forecastUrl: string = 'https://api.openweathermap.org/data/2.5/forecast?q={{inputPlaceholder}}&appid={{apiKey}}&units=imperial'
  apiKey: string = ''
  instantForecast!: instantForecast;
  WeatherData!: WeatherData
  dayArray: string[] = []
  tempArray!: [number];
  myArray = [1, 2, 3, 4, 5]
  

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
    this.http.get<instantForecast>(dynamicUrl).pipe(
      switchMap((data) => {
        this.instantForecast = data
        console.log(this.instantForecast)
        cityUrl = this.forecastUrl.replace('{{inputPlaceholder}}', this.inputText)
        dynamicUrl = cityUrl.replace('{{apiKey}}', this.apiKey)
        return this.http.get<WeatherData>(dynamicUrl)
      })
    ).subscribe(
      (data) => {
        this.WeatherData = data;
        
        // finds the next 5 days and stores then in dayArray
        for (let i=0; i < 40; i++) {
          if (!this.dayArray.includes(this.WeatherData.list[i].dt_txt.slice(0, 10))){
            this.dayArray.push(this.WeatherData.list[i].dt_txt.slice(0, 10))
          }
        }

        for (let i=0; i < this.dayArray.length; i++) {
          
        }

      },
      (error) => {
        console.error('An error occurred:', error)
      }
    )
    localStorage.setItem('myArray', JSON.stringify(this.myArray))  
  }
}
