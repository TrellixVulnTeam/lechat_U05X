import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { tap, delay } from 'rxjs/operators';
import { Router } from  "@angular/router";
import { AngularFireAuth } from  "@angular/fire/auth";
import firebase from 'firebase/app'
import { CommuteService } from './../commute.service';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  user: any;
  // isLoggedIn = false;

  // store the URL so we can redirect after logging in
  redirectUrl: string;

  constructor(public  afAuth:  AngularFireAuth, public  router: Router, private commuteService: CommuteService) {
    this.afAuth.authState.subscribe(user => {
      if (user){
        this.user = user;
        localStorage.setItem('user', JSON.stringify(this.user));
      } else {
        localStorage.setItem('user', null);
      }
    })
   }
   async login(email: string, password: string) {
    var result = await this.afAuth.signInWithEmailAndPassword(email, password)
    this.router.navigate(['admin/list']);
    }
  async register(email: string, password: string) {
    var result = await this.afAuth.createUserWithEmailAndPassword(email, password)
    this.sendEmailVerification();
    }
  async sendEmailVerification() {
    await this.afAuth.currentUser.then(u => u.sendEmailVerification())
    .then(() => {
      this.router.navigate(['verify-email']);
    });
    }
    async sendPasswordResetEmail(passwordResetEmail: string) {
      return await this.afAuth.sendPasswordResetEmail(passwordResetEmail);
    }
    async logout(){
      await this.afAuth.signOut();
      localStorage.removeItem('user');
      this.router.navigate(['']);
    }
    get isLoggedIn(): boolean {
      const  user  =  JSON.parse(localStorage.getItem('user'));
      return  user  !==  null;
    }
    async  loginWithGoogle(){
      const res = await  this.afAuth.signInWithPopup(new firebase.auth.GoogleAuthProvider());
      if (res) {
        const userInfo = res.additionalUserInfo.profile['name']
        this.sendCommute(userInfo);
      }
      this.router.navigate(['']);
  }
  sendCommute(mess): void {
    // send message to subscribers via observable subject
    this.commuteService.sendMessage(mess);
  }

  clearCommute(): void {
    // clear messages
    this.commuteService.clearMessages();
  }

  // login(): Observable<boolean> {
  //   return of(true).pipe(
  //     delay(1000),
  //     tap(val => this.isLoggedIn = true)
  //   );
  // }

  // logout(): void {
  //   this.isLoggedIn = false;
  // }
}
