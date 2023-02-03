import {
  AfterViewChecked,
  Component,
  ElementRef,
  OnInit,
  ViewChild,
} from '@angular/core';
import { WebSocketService } from '../../../shared/services/web-socket-service/web-socket.service';
import { ChatMessage, ClientChatMessage } from '../../../app/model/chat.model';
import { MessageClient } from '../../../app/model/client.model';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { ImageService } from '../../../shared/services/image-service/image.service';
import { UserService } from '../../../shared/services/user-service/user.service';

@Component({
  selector: 'app-admin-chat-box',
  templateUrl: './admin-chat-box.component.html',
  styleUrls: ['./admin-chat-box.component.css'],
})
export class AdminChatBoxComponent implements OnInit, AfterViewChecked {
  messageText = '';
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
    private sanitizer: DomSanitizer,
    public userService: UserService
  ) {}

  ngOnInit(): void {
    this.webSocket.initializeWebSocketConnection('', true);
    this.webSocket.getUserMessages().subscribe((data) => {
      //this.webSocket.webSocketMessage = [...data.map()];
      data.map((x) =>
        this.webSocket.webSocketMessage.push(
          new ChatMessage(x.from, x.text, x.to.email)
        )
      );
      this.addClients(data);
      if (this.clientBoxes.length >= 1) {
        this.activeClient = this.clientBoxes[0];
      }
    });
  }

  addClients(data: ClientChatMessage[]) {
    for (const message of data) {
      this.findClients(message.from);
      this.findClients(message.to);
    }
  }

  checkClient(m: ChatMessage): boolean {
    const usernames = this.clientBoxes.map((x) => x.email);
    return m.from.email != this.email && !usernames.includes(m.from.email);
  }

  findClients(client: MessageClient) {
    const usernames = this.clientBoxes.map((x) => x.email);
    if (client.email != this.email && !usernames.includes(client.email)) {
      this.clientBoxes.push(client);
      this.loadProfilePhoto(client);
    }
  }

  loadProfilePhoto(client: MessageClient) {
    this.imageService.loadImage(client.photo).subscribe((data) => {
      const imageUrl = URL.createObjectURL(data);
      const src = this.sanitizer.bypassSecurityTrustUrl(imageUrl);
      this.clientPhotos.set(client.email, src);
    });
  }

  sendMessage() {
    const admin = new MessageClient();
    admin.email = this.email!;
    const msg = new ChatMessage(
      admin,
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
    } catch (err) {
      console.log(err);
    }
  }
}
