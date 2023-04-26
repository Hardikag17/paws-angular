import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';
import { Router } from '@angular/router';
import { faMessage, faCircle } from '@fortawesome/free-solid-svg-icons';
import { Pet } from 'src/app/interfaces/pet';
import { ChatService } from 'src/app/services/api/chat.service';

@Component({
  selector: 'app-request-card',
  templateUrl: './request-card.component.html',
  styleUrls: ['./request-card.component.css'],
})
export class RequestCardComponent {
  icons = { faMessage, faCircle };
  @Input() request!: Pet;
  @Input() status!: string;
  @Output() onCancelRequest: EventEmitter<Pet> = new EventEmitter();

  constructor(private router: Router, private getChatService: ChatService) {}

  cancelRequest = () => {
    this.onCancelRequest.emit(this.request);
  };

  addChatList = () => {
    console.log('here');
    let userId: any = sessionStorage.getItem('state');
    userId = JSON.parse(userId).userId;
    this.getChatService
      .addChat(userId, this.request.RescuerID, this.request.PetID)
      .subscribe((res) => {
        this.router.navigate([`${userId}/chat`]).then(
          (chat) => {
            console.log('router navigation', chat);
          },
          (err) => {
            console.log(err);
          }
        );
      });
  };
}
