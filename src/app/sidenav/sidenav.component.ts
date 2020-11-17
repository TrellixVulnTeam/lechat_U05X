import { CommuteService } from './../commute.service';
import firebase from 'firebase/app';
import 'firebase/database';
import { Component, OnInit, AfterContentInit, OnDestroy } from '@angular/core';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Observable } from 'rxjs';
import { map, shareReplay } from 'rxjs/operators';
import { environment } from '../../environments/environment';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import { IRoom } from '../interfaces/IRoom';
import { IDBRoom } from './../interfaces/IDBRoom';
import { Subscription } from 'rxjs';
import { IDBMessage } from '../interfaces/IDBMessage';

@Component({
  selector: 'app-sidenav',
  templateUrl: './sidenav.component.html',
  styleUrls: ['./sidenav.component.css'],
})
export class SidenavComponent implements OnInit, AfterContentInit, OnDestroy {
  currentPage = 'Le Chat';
  db: any;
  roomList: IDBRoom[] = [];
  lastMessages: IDBMessage[] = [];
  roomId: string;
  roomIdName: string;
  isHandset$: Observable<boolean> = this.breakpointObserver
    .observe(Breakpoints.Handset)
    .pipe(
      map((result) => result.matches),
      shareReplay()
    );
  subscription: Subscription;
  userId: string;

  constructor(
    private breakpointObserver: BreakpointObserver,
    private route: ActivatedRoute,
    private router: Router,
    private commuteService: CommuteService
  ) {
    this.db = firebase.initializeApp(environment.firebase);
    // subscribe to home component messages
    this.subscription = this.commuteService.onMessage().subscribe((message) => {
      if (message) {
        console.log(message);
        this.userId = message;
      } else {
        // clear messages when empty message received
        this.userId = null;

      }
    });
  }

  ngOnInit(): void {
    this.onDbRooms();
  }
  ngAfterContentInit(): void {
    this.route.queryParams.subscribe((params) => {
      this.roomId = params.roomId;
      if (this.roomId !== undefined) {
        this.currentPage = this.roomId;
      } else {
        this.currentPage = 'Le Chat';
      }
    });
  }
  ngOnDestroy(): void {
    // unsubscribe to ensure no memory leaks
    this.subscription.unsubscribe();
  }

  onDbRooms(): void {
    const vm = this;
    this.db
      .database()
      .ref('rooms/')
      .on('value', (snapshot) => {
        this.roomList = this.loader(snapshot);
      });
  }

  // onLastMessage(roomId: string): void {
  //   this.db
  //     .database()
  //     .ref(roomId + '/messages/')
  //     .limitToLast(1)
  //     .once('value', (snapshot) => {
  //       const data: IDBMessage = snapshot.val();
  //       const holder: IDBMessage[] = [];
  //       for (const i in data) {
  //         this.lastMessages.push({ id: i, data: data[i] });
  //       }
  //     });
  // }

  loader(snapshot): IDBRoom[] {
    const data: IDBRoom = snapshot.val() || 'Anonymous';
    const holder: IDBRoom[] = [];
    for (const i in data) {
      const temp: IRoom = data[i];
      holder.push({ id: i, data: temp });
    }
    return holder;
  }

  goto(roomId,roomIdName): void {
    this.roomId = roomId;
    this.router.navigate(['/room'], { queryParams: { roomId , userId: this.userId} });
  }
}
