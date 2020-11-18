import { async } from '@angular/core/testing';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Observable } from 'rxjs';
import { CommuteService } from './../commute.service';
import { AuthService } from '../auth/auth.service';
import firebase from 'firebase/app';
import 'firebase/database';

@Component({
  selector: 'app-chat-login',
  templateUrl: './chat-login.component.html',
  styleUrls: ['./chat-login.component.css'],
})
export class ChatLoginComponent implements OnInit {
  myForm: FormGroup;
  signInData: object;
  constructor(
    private fb: FormBuilder,
    private commuteService: CommuteService,
    public authService: AuthService
  ) {}

  ngOnInit(): void {
    // const uiConfig ={
    //   signInOptions:[
    //     firebase.auth.GoogleAuthProvider
    //   ]
    // }
    this.myForm = this.fb.group({
      roomId: '',
      userId: '',
      password: '',
    });
    // this.myForm.valueChanges.subscribe((x) => {
    //   console.log('form value changed');
    //   console.log(x);
    // });
  }
  // enter(): void{
  //   this.authService.loginWithGoogle(this.myForm.value.userId);
  //   // this.authService.login(this.myForm.value.userId, this.myForm.value.password).subscribe(() => {

  //   // });
  // }
  async loginWithG() {
    const res = await this.authService.loginWithGoogle();
    this.signInData = res;
  }
  logOut(): void {
    this.authService.logout();
    console.log('login', this.authService.isLoggedIn);
    this.clearCommute();
  }
  sendCommute(mess): void {
    // send message to subscribers via observable subject
    this.commuteService.sendMessage(mess);
  }

  clearCommute(): void {
    // clear messages
    this.commuteService.clearMessages();
  }
  creatRoom(): void {
    firebase
      .database()
      .ref('rooms/')
      .push({
        roomId: this.myForm.value.roomId,
        public: true,
        member: [this.signInData.userUID],
      });
  }
}
