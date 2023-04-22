import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AddpetComponent } from './addpet/addpet.component';
import { ChatComponent } from './chat/chat.component';
import { ProfileComponent } from './profile/profile.component';
import { RequestsComponent } from './requests/requests.component';
import { AuthGuard } from '../auth/auth.guard';

const routes: Routes = [
  {
    path: ':userID/profile',
    component: ProfileComponent,
    canActivate: [AuthGuard],
  },
  {
    path: ':userID/addpet',
    component: AddpetComponent,
    canActivate: [AuthGuard],
  },
  {
    path: ':userID/requests',
    component: RequestsComponent,
    canActivate: [AuthGuard],
  },
  {
    path: ':userID/chat',
    component: ChatComponent,
    canActivate: [AuthGuard],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class UsersRoutingModule {}
