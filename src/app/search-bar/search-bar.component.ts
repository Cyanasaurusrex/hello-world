import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { cardSearchReturn } from './cardSearchReturn.interface';

@Component({
  selector: 'app-search-bar',
  templateUrl: './search-bar.component.html',
  styleUrls: ['./search-bar.component.css']
})
export class SearchBarComponent {
  cardInput: string = '';

  constructor(private http: HttpClient) {} // inject HTTPClient

  cardSearch(cardInput: string) {
    this.http.get<cardSearchReturn>('http://localhost:3000/api/img/' + cardInput).subscribe((data) => {
      console.log(data);
    });
    this.cardInput = '';
  }
}