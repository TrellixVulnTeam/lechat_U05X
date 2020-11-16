import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class CommuteService {

  constructor() { }
  private subject = new Subject<any>();

    sendMessage(commuteData: string) {
        this.subject.next(commuteData );
    }

    clearMessages() {
        this.subject.next();
    }

    onMessage(): Observable<any> {
        return this.subject.asObservable();
    }
}

