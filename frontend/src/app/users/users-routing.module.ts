import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AddpetComponent } from './addpet/addpet.component';
import { ChatComponent } from './chat/chat.component';
import { ProfileComponent } from './profile/profile.component';
import { RequestsComponent } from './requests/requests.component';

const routes: Routes = [
  {
    path: ':userID/profile',
    component: ProfileComponent,
  },
  {
    path: ':userID/addpet',
    component: AddpetComponent,
  },
  {
    path: ':userID/requests',
    component: RequestsComponent,
  },
  {
    path: ':userID/chat',
    component: ChatComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class UsersRoutingModule {}
