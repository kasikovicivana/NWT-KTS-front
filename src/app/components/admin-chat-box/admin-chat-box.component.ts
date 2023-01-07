import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { WebSocketService } from '../../service/web-socket.service';
import { ChatMessage, ClientChatMessage } from '../../model/chat.model';
import { MessageClient } from '../../model/client.model';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { ImageService } from '../../service/image.service';

@Component({
  selector: 'app-admin-chat-box',
  templateUrl: './admin-chat-box.component.html',
  styleUrls: ['./admin-chat-box.component.css'],
})
export class AdminChatBoxComponent implements OnInit {
  messageText: string = '';
  email: string | null = sessionStorage.getItem('username');
  clientBoxes: MessageClient[] = [];
  clientPhotos: Map<string, SafeResourceUrl> = new Map<
    string,
    SafeResourceUrl
  >();
  activeClient: MessageClient = new MessageClient();
  @ViewChild('scrollMe') myScrollContainer: ElementRef | undefined;

  constructor(
    public webSocket: WebSocketService,
    private imageService: ImageService,
    private sanitizer: DomSanitizer
  ) {}

  ngOnInit(): void {
    this.webSocket.initializeWebSocketConnection('', true);
    this.webSocket.getUserMessages().subscribe((data) => {
      //this.webSocket.webSocketMessage = [...data.map()];
      data.map((x) =>
        this.webSocket.webSocketMessage.push(
          new ChatMessage(x.from.email, x.text, x.to.email)
        )
      );
      this.addClients(data);
      if (this.clientBoxes.length >= 1) {
        this.activeClient = this.clientBoxes[0];
      }
    });
  }

  addClients(data: ClientChatMessage[]) {
    for (let message of data) {
      this.findClients(message.from);
      this.findClients(message.to);
    }
  }

  findClients(client: MessageClient) {
    let usernames = this.clientBoxes.map((x) => x.email);
    if (client.email != this.email && !usernames.includes(client.email)) {
      this.clientBoxes.push(client);
      this.loadProfilePhoto(client);
    }
  }

  loadProfilePhoto(client: MessageClient) {
    this.imageService.loadImage(client.photo).subscribe((data) => {
      let imageUrl = URL.createObjectURL(data);
      let src = this.sanitizer.bypassSecurityTrustUrl(imageUrl);
      this.clientPhotos.set(client.email, src);
    });
  }

  sendMessage() {
    let msg = new ChatMessage(
      this.email!,
      this.messageText,
      this.activeClient.email
    );
    this.webSocket.sendMessage(msg);
    this.messageText = '';
  }

  changeActiveClient(client: MessageClient) {
    this.activeClient = client;
  }

  ngAfterViewChecked() {
    this.scrollToBottom();
  }

  scrollToBottom(): void {
    try {
      this.myScrollContainer!.nativeElement.scrollTop =
        this.myScrollContainer!.nativeElement.scrollHeight;
    } catch (err) {}
  }
}
