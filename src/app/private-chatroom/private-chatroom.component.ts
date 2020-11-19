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
import { CommuteService } from '../commute.service';
import { AuthService } from '../auth/auth.service';

@Component({
  selector: 'app-private-chatroom',
  templateUrl: './private-chatroom.component.html',
  styleUrls: ['./private-chatroom.component.css'],
})
export class PrivateChatroomComponent implements OnInit {
  id: string;
  userId: string;
  userUID: string;
  memberList: string[];
  memberDataObject = {};
  allMessages: IDBMessage[] = [];
  isTyping = [];
  message = '';
  url =
    'https://images.theconversation.com/files/38926/original/5cwx89t4-1389586191.jpg';
  item: Observable<any>;
  subscription: Subscription;

  @Output() newItemEvent = new EventEmitter<string>();

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private commuteService: CommuteService,
    private authService: AuthService
  ) {
    this.subscription = this.commuteService.onMessage().subscribe((message) => {
      if (message) {
        this.userId = message;
        // console.log('Chatroom userId>> ', this.userId);
      } else {
        // clear messages when empty message received
      }
    });
  }

  ngOnInit(): void {
    if (firebase.apps.length === 0) {
      // console.log('init again');
      firebase.initializeApp(environment.firebase);
    }
    this.userId = this.authService.loggedInUserData.userName;
    this.userUID = this.authService.loggedInUserData.uid;
    this.route.params.subscribe((params) => {
      this.id = params.uid;
      firebase
        .database()
        .ref('privateRooms/' + this.id + '/member/')
        .on('value', (snapshot) => {
          const data = snapshot.val();
          if (!data.includes(this.userUID)) {
            // console.log(this.userUID, ' first time enter');
            this.addMember(data, this.userUID);
          }
          this.memberList = snapshot.val();
          this.memberList.forEach((ele) => {
            firebase
              .database()
              .ref('status/' + ele + '/')
              .once('value', (snapshot) => {
                this.memberDataObject[ele] = snapshot.val();
              });
          });
          console.log(this.memberDataObject);
        });
      this.listener();
      this.typingListener();
    });


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
      .ref('privateRooms/' + vm.id + '/messages/')
      .on('value', (snapshot) => {
        vm.loader(snapshot);
      });
  }
  loader(snapshot): void {
    const data: IDBMessage = snapshot.val();
    const holder: IDBMessage[] = [];
    for (const i in data) {
      const temp: IMessage = data[i];
      holder.push({ id: i, data: temp });
    }
    this.allMessages = holder;
  }
  typingListener(): void {
    const vm = this;
    firebase
      .database()
      .ref('privateRooms/' + vm.id + '/isTyping/')
      .on('value', (snapshot) => {
        this.isTyping = snapshot.val();
      });
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
      // console.log('child', this.allMessages[this.allMessages.length - 1]);
    } else {
      // console.log('No user Init');
    }
  }

  writeUserData(userId, message): void {
    const time = new Date().toLocaleString();
    firebase
      .database()
      .ref('privateRooms/' + this.id + '/messages/')
      .push({
        userId,
        uid: this.userUID,
        message,
        time,
      });
    this.updateLatestMes();
  }
  updateLatestMes(): void {
    const updates = {};
    updates['privateRooms/' + this.id + '/latest/'] = this.allMessages[
      this.allMessages.length - 1
    ];
    firebase.database().ref().update(updates);
  }
  addMember(origin, newMember): void {
    const updates = {};
    updates['privateRooms/' + this.id + '/member/'] = [...origin, newMember];
    firebase.database().ref().update(updates);
    firebase
      .database()
      .ref('privateRooms/' + this.id + '/isTyping/' + newMember + '/')
      .push(false);
  }
  onFocus(): void {
    const updates = {};
    updates['privateRooms/' + this.id + '/isTyping/' + this.userUID + '/'] = true;
    firebase.database().ref().update(updates);
  }
  onBlur(): void {
    const updates = {};
    updates['privateRooms/' + this.id + '/isTyping/' + this.userUID + '/'] = false;
    firebase.database().ref().update(updates);
  }
}
