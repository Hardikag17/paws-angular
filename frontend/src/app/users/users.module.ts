import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { UsersRoutingModule } from './users-routing.module';
import { ProfileComponent } from './profile/profile.component';

import { SharedModule } from '../shared/shared.module';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { RequestsComponent } from './requests/requests.component';
import { AddpetComponent } from './addpet/addpet.component';

@NgModule({
  declarations: [ProfileComponent, RequestsComponent, AddpetComponent],
  imports: [CommonModule, UsersRoutingModule, SharedModule, FontAwesomeModule],
})
export class UsersModule {}
