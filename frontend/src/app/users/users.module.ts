import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatSelectModule } from '@angular/material/select';

import { UsersRoutingModule } from './users-routing.module';
import { ProfileComponent } from './profile/profile.component';

import { SharedModule } from '../shared/shared.module';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { RequestsComponent } from './requests/requests.component';
import { AddpetComponent } from './addpet/addpet.component';
import { FormsModule } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [ProfileComponent, RequestsComponent, AddpetComponent],
  imports: [
    CommonModule,
    UsersRoutingModule,
    SharedModule,
    FontAwesomeModule,
    MatSelectModule,
    FormsModule,
    ReactiveFormsModule,
  ],
})
export class UsersModule {}
