import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, map } from 'rxjs';
import { API_ROOT } from 'src/app/api-config';
import { Socket } from 'ngx-socket-io';
import { Message } from 'src/app/interfaces/message';

@Injectable({
  providedIn: 'root',
})
export class ChatService {
  constructor(private http: HttpClient, private socket: Socket) {}

  getRoom = (senderId: string, receiverId: string): Observable<any> => {
    return this.http
      .post(
        `${API_ROOT}/chat/room`,
        {
          SenderId: senderId,
          RecevierId: receiverId,
        },
        { withCredentials: true }
      )
      .pipe(
        map((res: any) => {
          return res.roomId;
        })
      );
  };

  getChats = (roomId: string) => {
    return this.http
      .post(
        `${API_ROOT}/chat/texts`,
        {
          RoomId: roomId,
        },
        { withCredentials: true, responseType: 'text' }
      )
      .pipe(
        map((res) => {
          console.log(JSON.parse(res).texts);
          return JSON.parse(res).texts;
        })
      );
  };

  addChat = (
    senderId: string,
    receiverId: string,
    PetID: string
  ): Observable<any> => {
    return this.http
      .post(
        `${API_ROOT}/chat/chatlist/add`,
        {
          UserId: senderId,
          ConnectionId: receiverId,
          PetID: PetID,
        },
        { withCredentials: true, responseType: 'text' }
      )
      .pipe(map((res) => console.log(res)));
  };

  uniqByKeepLast = (data: any, key: any) => {
    return [...new Map(data.map((x: any) => [key(x), x])).values()];
  };

  getChatList = (userId: string) => {
    return this.http
      .get(`${API_ROOT}/chat/chatlist/${userId}`, { withCredentials: true })
      .pipe(
        map((res: any) => res.ChatList),
        map((res) => {
          Object.keys(res).forEach((el) => delete res[el]._id);
          res = this.uniqByKeepLast(res, (el: any) => el.UserId);
          res = res.filter((el: any) => {
            if (Object.keys(el).length !== 0) return true;
            return false;
          });
          console.log(res);
          return res;
        })
      );
  };

  joinRoom = (room: string) => {
    this.socket.emit('join_room', room);
  };

  // receiveMessages = () => {
  //   this.socket.on('receive_message', (data: any) => {
  //     return data;
  //   });
  // };

  postMessage = (message: any) => {
    this.socket.emit('send_message', message);
  };
}
