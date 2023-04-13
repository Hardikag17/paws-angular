import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { UsersRoutingModule } from './users-routing.module';
import { ProfileComponent } from './profile/profile.component';
import { RequestsComponent } from './profile/requests/requests.component';
import { SharedModule } from '../shared/shared.module';

@NgModule({
  declarations: [ProfileComponent, RequestsComponent],
  imports: [CommonModule, UsersRoutingModule, SharedModule],
})
export class UsersModule {}
