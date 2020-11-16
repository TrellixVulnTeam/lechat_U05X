import { ChatLoginComponent } from './chat-login/chat-login.component';
import { ChatroomComponent } from './chatroom/chatroom.component';

import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [
  { path: '', component: ChatLoginComponent },
  { path: 'room', component: ChatroomComponent },

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
