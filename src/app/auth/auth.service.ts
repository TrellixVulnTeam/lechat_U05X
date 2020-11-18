import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { tap, delay } from 'rxjs/operators';
import { Router } from '@angular/router';
import { AngularFireAuth } from '@angular/fire/auth';
import firebase from 'firebase/app';
import { CommuteService } from './../commute.service';
import { PresenseService } from './../presense.service';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  user: any;
  loginData: object;
  // isLoggedIn = false;

  // store the URL so we can redirect after logging in
  redirectUrl: string;

  constructor(
    public afAuth: AngularFireAuth,
    public router: Router,
    private commuteService: CommuteService,
    private presenseService: PresenseService
  ) {
    this.afAuth.authState.subscribe((user) => {
      if (user) {
        this.user = user;
        sessionStorage.setItem('user', JSON.stringify(this.user));
        if(this.isLoggedIn){
          this.log();
        }
      } else {
        sessionStorage.setItem('user', null);
      }
    });
  }

  async login(email: string, password: string) {
    var result = await this.afAuth.signInWithEmailAndPassword(email, password);
    this.router.navigate(['admin/list']);
  }
  async register(email: string, password: string) {
    var result = await this.afAuth.createUserWithEmailAndPassword(
      email,
      password
    );
    this.sendEmailVerification();
  }
  async sendEmailVerification() {
    await this.afAuth.currentUser
      .then((u) => u.sendEmailVerification())
      .then(() => {
        this.router.navigate(['verify-email']);
      });
  }
  async sendPasswordResetEmail(passwordResetEmail: string) {
    return await this.afAuth.sendPasswordResetEmail(passwordResetEmail);
  }
  async logout() {
    await this.afAuth.signOut();
    sessionStorage.removeItem('user');
    window.location.reload();
    // this.router.navigate(['']);
  }
  get isLoggedIn(): boolean {
    const user = JSON.parse(sessionStorage.getItem('user'));
    return user !== null;
  }
  get loggedInUserData(): object {
    const {uid, displayName, photoURL } = JSON.parse(sessionStorage.getItem('user'));
    return {uid,userName:displayName,avatar:photoURL};
  }
  async loginWithGoogle() {
    const res = await this.afAuth.signInWithPopup(
      new firebase.auth.GoogleAuthProvider()
    );
    if (res) {
      const userUID = res.user['uid'];
      const userPic = res.user['photoURL'];
      console.log('login success ',res.user, userUID, userPic);
      const userInfo = res.additionalUserInfo.profile['name'];
      this.sendCommute({ userInfo, userUID, userPic });
      this.loginData = res;
      return { userInfo, userUID, userPic };
    }
    // this.router.navigate(['']);
  }
  sendCommute(mess): void {
    // send message to subscribers via observable subject
    this.commuteService.sendMessage(mess);
  }

  clearCommute(): void {
    // clear messages
    this.commuteService.clearMessages();
  }
  log() {
    // Fetch the current user's ID from Firebase Authentication.
    const uid = this.user.uid;
    const userName = this.user.displayName;
    const avatar = this.user.photoURL;
    // Create a reference to this user's specific status node.
    // This is where we will store data about being online/offline.
    const userStatusDatabaseRef = firebase.database().ref('/status/' + uid);

    // We'll create two constants which we will write to
    // the Realtime database when this device is offline
    // or online.
    const isOfflineForDatabase = {
      userName,
      avatar,
      state: 'offline',
      last_changed: firebase.database.ServerValue.TIMESTAMP,
    };

    const isOnlineForDatabase = {
      userName,
      avatar,
      state: 'online',
      last_changed: firebase.database.ServerValue.TIMESTAMP,
    };

    // Create a reference to the special '.info/connected' path in
    // Realtime Database. This path returns `true` when connected
    // and `false` when disconnected.
    const vm =this;
    firebase
      .database()
      .ref('.info/connected')
      .on('value', function (snapshot) {
        // If we're not currently connected, don't do anything.
        if (snapshot.val() == false) {
          return;
        }
        vm.presenseService.sendMessage( vm.user.displayName +' is online!');

        // If we are currently connected, then use the 'onDisconnect()'
        // method to add a set which will only trigger once this
        // client has disconnected by closing the app,
        // losing internet, or any other means.
        userStatusDatabaseRef
          .onDisconnect()
          .set(isOfflineForDatabase)
          .then(function () {
            // The promise returned from .onDisconnect().set() will
            // resolve as soon as the server acknowledges the onDisconnect()
            // request, NOT once we've actually disconnected:
            // https://firebase.google.com/docs/reference/js/firebase.database.OnDisconnect

            // We can now safely set ourselves as 'online' knowing that the
            // server will mark us as offline once we lose connection.
            userStatusDatabaseRef.set(isOnlineForDatabase);
          });
      });
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
