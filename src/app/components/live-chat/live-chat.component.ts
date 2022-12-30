import { Component, OnInit } from '@angular/core';
import { WebSocketService } from '../../service/web-socket.service';
import { ChatMessage } from '../../model/chat.model';

@Component({
  selector: 'app-live-chat',
  templateUrl: './live-chat.component.html',
  styleUrls: ['./live-chat.component.css'],
})
export class LiveChatComponent implements OnInit {
  showModal: boolean = false;
  messageText: string = '';

  constructor(public webSocket: WebSocketService) {}

  ngOnInit(): void {
    this.webSocket.openWebSocketConnection();
  }

  ngOnDestroy() {
    this.webSocket.closeWebSocketConnection();
  }

  openChat() {
    this.showModal = true;
  }

  sendMessage() {
    let username = sessionStorage.getItem('username');
    let msg = new ChatMessage(username!, this.messageText);
    this.webSocket.sendWebSocketMessage(msg);
    this.messageText = '';
  }
}
