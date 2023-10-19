import { Injectable } from '@angular/core';
import { BehaviorSubject, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SharedDataService {
  private imageUrlSubject = new BehaviorSubject<string>('');
  private nameSubject = new BehaviorSubject<string>('')
  imageUrl$ = this.imageUrlSubject.asObservable()
  cardName$ = this.nameSubject.asObservable()

  setCardData(imageUrl: string, cardName: string) {
    this.imageUrlSubject.next(imageUrl)
    this.nameSubject.next(cardName)
  }

  private clearCardsSubject = new Subject<void>()

  clearCards$ = this.clearCardsSubject.asObservable()

  clear() {
    this.clearCardsSubject.next()
  }

  constructor() { }
}
