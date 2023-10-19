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
    this.http.get<cardSearchReturn[]>('http://localhost:3000/api/img/' + cardInput).subscribe((data) => {   
      if (data.length > 0) {
        const firstResult = data[0];
        if (firstResult.img_normal) {
          this.sharedDataService.setImgUrl(firstResult.img_normal);
        } else {
          console.error('Image URL is undefined in the API response.');
        }
      } else {
        console.error('No results in the API response.');
      }
    });
    this.cardInput = '';
  }
}