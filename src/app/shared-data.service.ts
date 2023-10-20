import { Injectable } from '@angular/core';
import { BehaviorSubject, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SharedDataService {
  private imageUrlSubject = new BehaviorSubject<string>('');
  private nameSubject = new BehaviorSubject<string>('')
  private price_usdSubject = new BehaviorSubject<number | null>(null)
  imageUrl$ = this.imageUrlSubject.asObservable()
  cardName$ = this.nameSubject.asObservable()
  priceUSD$ = this.price_usdSubject.asObservable();

  setCardData(imageUrl: string, cardName: string, price_usd: number | null) {
    this.imageUrlSubject.next(imageUrl)
    this.nameSubject.next(cardName)
    this.price_usdSubject.next(price_usd)
  }

  private clearCardsSubject = new Subject<void>()

  clearCards$ = this.clearCardsSubject.asObservable()

  clear() {
    this.clearCardsSubject.next()
  }

  constructor() { }
}
