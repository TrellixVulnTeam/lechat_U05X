import { ChatLoginComponent } from './chat-login/chat-login.component';
import { ChatroomComponent } from './chatroom/chatroom.component';
import { PrivateChatroomComponent } from './private-chatroom/private-chatroom.component';

import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthGuard } from './auth/auth.guard';

const routes: Routes = [
  { path: 'login', component: ChatLoginComponent },
  { path: '', redirectTo: 'login', pathMatch: 'full' },
  { path: 'room/:uid', component: ChatroomComponent,
    canActivate: [AuthGuard], },
  { path: 't/:uid', component: PrivateChatroomComponent,
    canActivate: [AuthGuard], },
  { path: '**', redirectTo: 'login', pathMatch: 'full' },

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
