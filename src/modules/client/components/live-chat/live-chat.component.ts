import {
  AfterViewChecked,
  Component,
  ElementRef,
  OnInit,
  ViewChild,
} from '@angular/core';
import { WebSocketService } from '../../../shared/services/web-socket-service/web-socket.service';
import { ChatMessage } from '../../../app/model/chat.model';
import { Client, MessageClient } from '../../../app/model/client.model';
import { ImageService } from '../../../shared/services/image-service/image.service';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { UserService } from '../../../shared/services/user-service/user.service';

@Component({
  selector: 'app-live-chat',
  templateUrl: './live-chat.component.html',
  styleUrls: ['./live-chat.component.css'],
})
export class LiveChatComponent implements OnInit, AfterViewChecked {
  showModal = false;
  messageText = '';
  imageUrl = '';
  srcData: SafeResourceUrl | undefined;
  client: Client = new Client();
  @ViewChild('scrollMe') myScrollContainer: ElementRef | undefined;

  constructor(
    public webSocket: WebSocketService,
    private userService: UserService,
    private imageService: ImageService,
    private sanitizer: DomSanitizer
  ) {}

  ngOnInit(): void {
    if (sessionStorage.getItem('role') === 'ROLE_client') {
      this.userService.getLoggedClient().subscribe((data: Client) => {
        this.client = data;
        if (!this.client.isSocialLogin) {
          this.imageService.loadImage(this.client.photo).subscribe((data) => {
            this.imageUrl = URL.createObjectURL(data);
            this.srcData = this.sanitizer.bypassSecurityTrustUrl(this.imageUrl);
          });
        }
      });
    }

    this.addOldMessages();

    this.webSocket.initializeWebSocketConnection(
      sessionStorage.getItem('username')!,
      false
    );
    this.scrollToBottom();
  }

  addOldMessages() {
    this.webSocket.getUserMessages().subscribe(
      (data) => {
        console.log(data);
        //this.webSocket.webSocketMessage = [...data];
        data.map((x) =>
          this.webSocket.webSocketMessage.push(
            new ChatMessage(x.from, x.text, x.to.email)
          )
        );
      },
      () => console.log('propo')
    );
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

  openChat() {
    this.showModal = true;
  }

  sendMessage() {
    const sender = new MessageClient(
      this.client.name,
      this.client.surname,
      this.client.email,
      this.client.photo,
      this.client.isSocialLogin
    );
    const msg = new ChatMessage(sender, this.messageText, 'admins');
    this.webSocket.sendMessage(msg);
    this.messageText = '';
  }
}
