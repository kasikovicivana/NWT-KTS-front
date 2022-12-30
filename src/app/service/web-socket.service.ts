import { Injectable } from '@angular/core';
import { ChatMessage } from '../model/chat.model';

@Injectable({
  providedIn: 'root',
})
export class WebSocketService {
  websocket: WebSocket | undefined;
  webSocketMessage: ChatMessage[] = [];

  constructor() {}

  openWebSocketConnection() {
    this.websocket = new WebSocket('wss://localhost:4201/websocket');

    this.websocket.onopen = (e) => {
      console.log(e);
    };

    this.websocket.onmessage = (e) => {
      console.log(e);
      const msg = JSON.parse(e.data);
      this.webSocketMessage.push(msg);
    };

    this.websocket.onclose = (e) => {
      console.log(e);
    };
  }

  sendWebSocketMessage(msg: ChatMessage) {
    this.websocket?.send(JSON.stringify(msg));
  }

  closeWebSocketConnection() {
    this.websocket?.close();
  }
}
