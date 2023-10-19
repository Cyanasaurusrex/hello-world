import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SharedDataService {

  private imageUrlSubject = new BehaviorSubject<string>('');
  imageUrl$ = this.imageUrlSubject.asObservable()

  setImgUrl(url: string) {
    this.imageUrlSubject.next(url)
  }

  constructor() { }
}
