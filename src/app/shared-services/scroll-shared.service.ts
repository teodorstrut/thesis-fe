import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ScrollSharedService {
  private scrollEvent = new Subject<any>();

  public constructor() {}

  public sendScrollEvent() {
    this.scrollEvent.next();
  }

  public awaitScrollEvent() {
    return this.scrollEvent.asObservable();
  }
}
