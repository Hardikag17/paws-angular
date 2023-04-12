import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ProfileComponent } from './profile/profile.component';
import { RequestsComponent } from './profile/requests/requests.component';

const routes: Routes = [
  {
    path: ':userID',
    component: ProfileComponent,
    children: [{ path: 'requests', component: RequestsComponent }],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class UsersRoutingModule {}
