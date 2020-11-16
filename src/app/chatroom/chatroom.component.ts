import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import {
  AngularFireDatabase,
  AngularFireList,
  AngularFireObject,
} from '@angular/fire/database';
import { Observable, Subscription } from 'rxjs';
import firebase from 'firebase/app';
import 'firebase/database';
import { environment } from '../../environments/environment';

import { AngularFireModule, FirebaseApp } from '@angular/fire';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import { IMessage } from '../interfaces/IMessage';
import { IDBMessage } from '../interfaces/IDBMessage';
import { CommuteService } from './../commute.service';

@Component({
  selector: 'app-chatroom',
  templateUrl: './chatroom.component.html',
  styleUrls: ['./chatroom.component.css'],
})
export class ChatroomComponent implements OnInit {
  id: string;
  userId: string;
  allMessages: IDBMessage[] = [];
  message = '';
  url =
    'https://images.theconversation.com/files/38926/original/5cwx89t4-1389586191.jpg';
  item: Observable<any>;
  subscription: Subscription;

  @Output() newItemEvent = new EventEmitter<string>();

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private commuteService: CommuteService
  ) {
    this.subscription = this.commuteService.onMessage().subscribe((message) => {
      if (message) {
        this.userId = message;
        console.log('Chatroom userId>> ', this.userId);
      } else {
        // clear messages when empty message received
      }
    });
  }

  ngOnInit(): void {
    if (firebase.apps.length === 0) {
      console.log('init again');
      firebase.initializeApp(environment.firebase);
    }
    this.route.queryParams.subscribe((params) => {
      this.id = params.roomId;
      this.userId = params.userId;
      this.listener();
    });

    // this.listener();

    const container = document.querySelector('.chatroom');
    const observer = new MutationObserver((mutations) => {
      mutations.forEach(
        (mutation) => (container.scrollTop = container.scrollHeight)
      );
    });

    observer.observe(container, {
      attributes: true,
      childList: true,
      characterData: true,
    });
  }

  listener(): void {
    const vm = this;
    firebase
      .database()
      .ref('rooms/' + vm.id + '/messages/')
      .on('value', (snapshot) => {
        vm.loader(snapshot);
      });
  }
  loader(snapshot) {
    const data: IDBMessage = snapshot.val();
    const holder: IDBMessage[] = [];
    for (const i in data) {
      const temp: IMessage = data[i];
      holder.push({ id: i, data: temp });
    }
    this.allMessages = holder;
  }

  sendMessage(mess = ''): void {
    if (this.userId) {
      if (this.userId === 'admin' && this.message === '>KILL_ALL_MESSAGE') {
        firebase
          .database()
          .ref(this.id + '/messages/')
          .remove();
        return;
      }
      if (mess.length > 0) {
        this.writeUserData(this.userId, mess);
      }
      if (this.message.length > 0) {
        this.writeUserData(this.userId, this.message);
        this.message = '';
      }
      console.log('child', this.allMessages[this.allMessages.length - 1]);
    } else {
      console.log('No user Init');
    }
  }

  writeUserData(userId, message): void {
    const time = new Date().toLocaleString();
    firebase
      .database()
      .ref('rooms/' + this.id + '/messages/')
      .push({
        userId,
        message,
        time,
      });
      this.updateLatestMes();
  }
  updateLatestMes() {
    const updates = {};
    updates['rooms/' + this.id + '/latest/'] = this.allMessages[this.allMessages.length - 1];
    firebase.database().ref().update(updates);
  }
}
