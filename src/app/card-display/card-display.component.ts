import { Component } from '@angular/core';
import { SharedDataService } from '../shared-data.service';

@Component({
  selector: 'app-card-display',
  templateUrl: './card-display.component.html',
  styleUrls: ['./card-display.component.css']
})
export class CardDisplayComponent {
  cards: {cardName:string, imageUrl:string}[] =[]

  constructor(private sharedDataService: SharedDataService) {
      this.sharedDataService.cardName$.subscribe((cardName) => {
      this.cards.push({ cardName, imageUrl: ''})
    })

    this.sharedDataService.imageUrl$.subscribe((imageUrl) => {
      if (this.cards.length > 0) {
        this.cards[this.cards.length - 1].imageUrl = imageUrl
      }
    })

  }
}
