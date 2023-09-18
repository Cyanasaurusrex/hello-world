import { Component } from '@angular/core';

@Component({
  selector: 'app-course',
  templateUrl: './course.component.html',
  styleUrls: ['./course.component.css']
})
export class CourseComponent {
  inputText: string = '';

  sendData() {
    console.log(this.inputText)
  }

}
