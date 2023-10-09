import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { instantForecast } from './instantForecast.interface';
import { WeatherData } from './forecast.interface';
import { switchMap } from 'rxjs';

@Component({
  selector: 'app-course',
  templateUrl: './course.component.html',
  styleUrls: ['./course.component.css']
})
export class CourseComponent implements OnInit{
  inputText: string = '';
  apiUrl: string = 'https://api.openweathermap.org/data/2.5/weather?q={{inputPlaceholder}}&appid={{apiKey}}&units=imperial'
  forecastUrl: string = 'https://api.openweathermap.org/data/2.5/forecast?q={{inputPlaceholder}}&appid={{apiKey}}&units=imperial'
  apiKey: string = ''
  instantForecast!: instantForecast;
  WeatherData!: WeatherData
  dayObj: { [key: string]: number} = {}
  tempArray!: [number];
  cityArray: string[] = []

  ngOnInit() {
    const storedArray = localStorage.getItem('cityArray');
    if (storedArray) {
      this.cityArray = JSON.parse(storedArray)
    }
  }
  

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

  sendData(cityName: string) {
    if (cityName == "" || cityName == null) {
      console.log("fail")
      return
    }
    let cityUrl = this.apiUrl.replace('{{inputPlaceholder}}', cityName)
    let dynamicUrl = cityUrl.replace('{{apiKey}}', this.apiKey)
    this.http.get<instantForecast>(dynamicUrl).pipe(
      switchMap((data) => {
        this.instantForecast = data
        console.log(this.instantForecast)
        cityUrl = this.forecastUrl.replace('{{inputPlaceholder}}', cityName)
        dynamicUrl = cityUrl.replace('{{apiKey}}', this.apiKey)
        return this.http.get<WeatherData>(dynamicUrl)
      })
    ).subscribe(
      (data) => {
        this.WeatherData = data;
        for (let i=0; i < 40; i++) {
          if (!this.dayObj.hasOwnProperty(this.WeatherData.list[i].dt_txt.slice(0, 10))) {
            this.dayObj[this.WeatherData.list[i].dt_txt.slice(0, 10)] = 1
            continue
          }
          this.dayObj[this.WeatherData.list[i].dt_txt.slice(0, 10)] += 1
        }
        for (const key in this.dayObj) {
          if(this.dayObj.hasOwnProperty(key) && this.dayObj[key] < 8) {
            delete this.dayObj[key]
          }
        }
        console.log(this.dayObj)


      },
      (error) => {
        console.error('An error occurred:', error)
      }
    )
    if (!this.cityArray.includes(this.inputText) && this.inputText !== "") {
      this.cityArray.push(this.inputText)
      localStorage.setItem('cityArray', JSON.stringify(this.cityArray))      
    }   
    this.inputText = ""
  }
}
