import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatSelectModule } from '@angular/material/select';
import { SocketIoModule, SocketIoConfig } from 'ngx-socket-io';

import { UsersRoutingModule } from './users-routing.module';
import { ProfileComponent } from './profile/profile.component';

import { SharedModule } from '../shared/shared.module';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { RequestsComponent } from './requests/requests.component';
import { AddpetComponent } from './addpet/addpet.component';
import { FormsModule } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { MatIconModule } from '@angular/material/icon';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RouterModule } from '@angular/router';
import { RequestCardComponent } from './requests/request-card/request-card.component';
import { RequestsCardComponent } from './requests/requests-card/requests-card.component';
import { ChatComponent } from './chat/chat.component';
import { API_ROOT } from '../api-config';

const config: SocketIoConfig = {
  url: API_ROOT, // socket server url;
  options: {
    transports: ['websocket'],
  },
};

@NgModule({
  declarations: [
    ProfileComponent,
    RequestsComponent,
    AddpetComponent,
    RequestCardComponent,
    RequestsCardComponent,
    ChatComponent,
  ],
  imports: [
    CommonModule,
    UsersRoutingModule,
    SharedModule,
    FontAwesomeModule,
    MatSelectModule,
    MatIconModule,
    FormsModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    RouterModule,
    SocketIoModule.forRoot(config),
  ],
})
export class UsersModule {}
