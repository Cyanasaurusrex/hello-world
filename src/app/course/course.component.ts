import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http'; // Import HttpClient

@Component({
  selector: 'app-course',
  templateUrl: './course.component.html',
  styleUrls: ['./course.component.css']
})
export class CourseComponent {
  inputText: string = '';
  apiUrl: string = 'https://api.openweathermap.org/data/2.5/weather?q={{inputPlaceholder}}&appid={{apiKey}}&units=imperial'
  apiKey: string = ''

  constructor(private http: HttpClient) {} // Inject HttpClient

  sendData() {
    const cityUrl = this.apiUrl.replace('{{inputPlaceholder}}', this.inputText)
    const dynamicUrl = cityUrl.replace('{{apiKey}}', this.apiKey)
    this.http.get(dynamicUrl).subscribe(
      (data) => {
        console.log('API Response:', data);
      },
      (error) => {
        // Handle any errors that occurred during the API request
        console.error('An error occurred:', error);
      }
    );
  }
}
