import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Message } from 'src/app/interfaces/message';
import { ChatService } from 'src/app/services/api/chat.service';
import { formatDate } from '@angular/common';
import { Socket } from 'ngx-socket-io';
import { UserService } from 'src/app/services/api/user.service';
import { PetsService } from 'src/app/services/api/pets.service';
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
  userName$!: any;
  petName!: string;

  // Getting the userId
  userId: any = sessionStorage.getItem('state');

  senderId!: string;
  receiverId!: string;

  constructor(
    private getChatService: ChatService,
    private socket: Socket,
    private getUserService: UserService,
    private getPetsService: PetsService
  ) {
    this.userId = JSON.parse(this.userId).userId;
  }

  ngOnInit(): void {
    this.current = formatDate(
      this.day,
      'yyyy-mm-dd hh:mm:ss a',
      'en-US',
      '+0530'
    );

    this.getChatService.getChatList(this.userId).subscribe((res) => {
      this.chatList = res;
      res.forEach((el: any) => {
        this.getUserService.getUserInfo(el.UserId).subscribe((res) => {
          el.username = res;
        });
      });
    });

    console.log(this.userId);

    // this.messages.push(this.getChatService.receiveMessages());
    this.socket.on('receive_message', (data: any) => {
      this.messages.push(data);
    });
  }

  setReceiver = (receverId: string, PetID: string) => {
    this.receiverId = receverId;
    this.petId = PetID;
    this.getChatService.getRoom(this.userId, receverId).subscribe((res) => {
      this.room = res;
      this.userName$ = this.getUserService.getUserInfo(receverId);
      this.getPetsService.getPetByPetID(this.petId).subscribe((res) => {
        this.petName = res.response.Name;
      });
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
