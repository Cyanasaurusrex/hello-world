import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { instantForecast } from './instantForecast.interface';

@Component({
  selector: 'app-course',
  templateUrl: './course.component.html',
  styleUrls: ['./course.component.css']
})
export class CourseComponent {
  inputText: string = '';
  apiUrl: string = 'https://api.openweathermap.org/data/2.5/weather?q={{inputPlaceholder}}&appid={{apiKey}}&units=imperial'
  apiKey: string = ''
  instantForecast!: instantForecast;
  

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
    const cityUrl = this.apiUrl.replace('{{inputPlaceholder}}', this.inputText)
    const dynamicUrl = cityUrl.replace('{{apiKey}}', this.apiKey)
    this.http.get<instantForecast>(dynamicUrl).subscribe(
      (data) => {
        console.log('API Response:', data);
        this.instantForecast = data
        
        

      },
      (error) => {
        // Handle any errors that occurred during the API request
        console.error('An error occurred:', error);
      }
    );
  }
}
