import { Injectable } from '@angular/core';
import { ChatMessage, ClientChatMessage } from '../../../app/model/chat.model';
import * as SockJS from 'sockjs-client';
import * as Stomp from 'stompjs';
import { environment } from '../../../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { LoginService } from '../../../app/service/login-service/login.service';

@Injectable({
  providedIn: 'root',
})
export class WebSocketService {
  websocket: WebSocket | undefined;
  webSocketMessage: ChatMessage[] = [];
  private stompClient: any;
  private url = environment.backendUrl + 'api/chat';

  constructor(private _http: HttpClient, private loginService: LoginService) {}

  initializeWebSocketConnection(client: string, isAdmin: boolean) {
    const ws = new SockJS('http://localhost:9000/socket');
    this.stompClient = Stomp.over(ws);
    this.stompClient.debug = null;
    const that = this;
    this.stompClient.connect({}, function () {
      that.stompClient.subscribe('/chat', (message: { body: string }) => {
        if (message.body) {
          const msg: ChatMessage = JSON.parse(message.body);
          if (msg.from.email === client || isAdmin || msg.to === client) {
            that.webSocketMessage.push(msg);
            console.log(message.body);
          }
        }
      });
    });
  }

  sendMessage(msg: ChatMessage) {
    this.stompClient.send('/send/message', {}, JSON.stringify(msg));
    const fullUrl = this.url + '/saveMessage';
    this._http.post(fullUrl, msg).subscribe();
  }

  getUserMessages() {
    const fullUrl = this.url + '/getMessages';
    return this._http.get<Array<ClientChatMessage>>(fullUrl);
  }
}
