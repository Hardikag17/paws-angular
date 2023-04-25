import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Message } from 'src/app/interfaces/message';
import { ChatService } from 'src/app/services/api/chat.service';
import { formatDate } from '@angular/common';

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.css'],
})
export class ChatComponent implements OnInit {
  message!: string;
  messages!: [any];
  room!: string;
  chatList!: any;
  petId!: string;
  current = '';
  day = new Date();

  // Getting the userId
  userId: any = sessionStorage.getItem('state');

  senderId!: string;
  receiverId!: string;

  constructor(private getChatService: ChatService) {
    this.userId = JSON.parse(this.userId).userId;
  }

  ngOnInit(): void {
    this.current = formatDate(
      this.day,
      'yyyy-mm-dd hh:mm:ss a',
      'en-US',
      '+0530'
    );

    this.getChatService
      .getChatList(this.userId)
      .subscribe((res) => (this.chatList = res));

    console.log(this.userId);

    this.messages.push(this.getChatService.receiveMessages());
  }

  setReceiver = (receverId: string, PetID: string) => {
    this.receiverId = receverId;
    this.petId = PetID;
    this.getChatService.getRoom(this.userId, receverId).subscribe((res) => {
      this.room = res;
      this.getChatService
        .getChats(this.room)
        .subscribe((res) => (this.messages = res));
      this.getChatService.joinRoom(this.room);
    });
  };
  postMessage = () => {
    let message: Message = {
      RoomId: this.room,
      Sender: this.userId,
      RecevierId: this.receiverId,
      text: this.message,
      createdAt: this.current,
    };
    this.message = '';
    console.log(message);
    this.messages.push(message);
    console.log(this.messages);
    this.getChatService.postMessage(message);
  };
}
