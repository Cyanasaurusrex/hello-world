// import { Component, OnInit } from '@angular/core';
// import { SharedDataService } from '../shared-data.service';

// @Component({
//   selector: 'app-card-display',
//   templateUrl: './card-display.component.html',
//   styleUrls: ['./card-display.component.css']
// })
// export class CardDisplayComponent  implements OnInit{
//   cards: { cardName: string, imageUrl: string, priceUSD: number | null }[] = [];

//   constructor(private sharedDataService: SharedDataService) {
//       this.sharedDataService.cardName$.subscribe((cardName) => {
//       this.cards.push({ cardName, imageUrl: '', priceUSD:null})
//     })

//     this.sharedDataService.imageUrl$.subscribe((imageUrl) => {
//       if (this.cards.length > 0) {
//         this.cards[this.cards.length - 1].imageUrl = imageUrl
//       }
//     })

//     this.sharedDataService.priceUSD$.subscribe((priceUSD) => {
//       if (this.cards.length > 0) {
//         this.cards[this.cards.length - 1].priceUSD = priceUSD
//       }
//     })
//   }

//   ngOnInit(): void {
//     this.sharedDataService.clearCards$.subscribe(() => {
//       this.clearCards()
//     })
//   }

//   clearCards() {
//     this.cards = []
//   }
// }

import { Component, OnInit } from '@angular/core';
import { SharedDataService } from '../shared-data.service';
import { zip } from 'rxjs';

@Component({
  selector: 'app-card-display',
  templateUrl: './card-display.component.html',
  styleUrls: ['./card-display.component.css']
})
export class CardDisplayComponent implements OnInit {
  cards: { cardName: string, imageUrl: string, priceUSD: number | null }[] = [];

  constructor(private sharedDataService: SharedDataService) {
    zip(
      this.sharedDataService.cardName$,
      this.sharedDataService.imageUrl$,
      this.sharedDataService.priceUSD$
    ).subscribe(([cardName, imageUrl, priceUSD]) => {
      // Here you can safely update the cards array once all values are available.
      this.cards.push({ cardName, imageUrl: imageUrl || '', priceUSD });
    });
  }

  ngOnInit(): void {
    this.sharedDataService.clearCards$.subscribe(() => {
      this.clearCards();
    });
  }

  clearCards() {
    this.cards = [];
  }
}

