import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import {Observable} from 'rxjs';
import { CommuteService } from './../commute.service';

@Component({
  selector: 'app-chat-login',
  templateUrl: './chat-login.component.html',
  styleUrls: ['./chat-login.component.css'],
})
export class ChatLoginComponent implements OnInit {
  myForm: FormGroup;
  logIn = false;
  constructor(private fb: FormBuilder,    private commuteService: CommuteService    ) {}

  ngOnInit(): void {
    this.myForm = this.fb.group({
      roomId: '',
      userId: '',
      password: '',
    });
    this.myForm.valueChanges.subscribe((x) => {
      console.log('form value changed');
      console.log(x);
    });
  }
  enter(): void{
    this.logIn = true;
    this.sendCommute(this.myForm.value.userId);
  }
  logOut(): void {
    this.logIn = false;
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
}
