import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class PresenseService {

  constructor() { }
  private subject = new Subject<any>();

    sendMessage(presenseData: string) {
        this.subject.next(presenseData );
    }

    clearMessages() {
        this.subject.next();
    }

    onMessage(): Observable<any> {
        return this.subject.asObservable();
    }
}

