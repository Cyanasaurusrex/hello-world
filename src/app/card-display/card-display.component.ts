import { Component } from '@angular/core';
import { SharedDataService } from '../shared-data.service';

@Component({
  selector: 'app-card-display',
  templateUrl: './card-display.component.html',
  styleUrls: ['./card-display.component.css']
})
export class CardDisplayComponent {
  imageUrl:string = ''

  constructor(private sharedDataService: SharedDataService) {
    this.sharedDataService.imageUrl$.subscribe((url) => {
      this.imageUrl = url
    })
  }
}
