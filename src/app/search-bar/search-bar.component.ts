import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { cardSearchReturn } from './cardSearchReturn.interface';
import { SharedDataService } from '../shared-data.service';


@Component({
  selector: 'app-search-bar',
  templateUrl: './search-bar.component.html',
  styleUrls: ['./search-bar.component.css']
})
export class SearchBarComponent {
  cardInput: string = '';

  constructor(private http: HttpClient, private sharedDataService: SharedDataService) {} // inject HTTPClient  

  cardSearch(cardInput: string) {
    this.sharedDataService.clear()
    this.http.get<cardSearchReturn[]>('http://localhost:3000/api/img/' + cardInput).subscribe((data) => {   
      data.forEach((card) => {
        if (card.img_normal && card.name) {
          this.sharedDataService.setCardData(card.img_normal, card.name)
        }
      })    
    })
    this.cardInput = '';
  }
}