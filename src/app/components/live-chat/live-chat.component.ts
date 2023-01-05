import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { WebSocketService } from '../../service/web-socket.service';
import { ChatMessage } from '../../model/chat.model';
import { Client } from '../../model/client.model';
import * as Stomp from 'stompjs';
import * as SockJS from 'sockjs-client';
import { ProfileViewService } from '../../service/profile-view.service';
import { ImageService } from '../../service/image.service';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';

@Component({
  selector: 'app-live-chat',
  templateUrl: './live-chat.component.html',
  styleUrls: ['./live-chat.component.css'],
})
export class LiveChatComponent implements OnInit {
  showModal: boolean = false;
  messageText: string = '';
  imageUrl: string = '';
  srcData: SafeResourceUrl | undefined;
  client: Client = new Client();
  @ViewChild('scrollMe') myScrollContainer: ElementRef | undefined;

  constructor(
    public webSocket: WebSocketService,
    private profileViewService: ProfileViewService,
    private imageService: ImageService,
    private sanitizer: DomSanitizer
  ) {}

  ngOnInit(): void {
    if (sessionStorage.getItem('role') === 'ROLE_client') {
      this.profileViewService.getLoggedUserInfo().subscribe((data) => {
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
            new ChatMessage(x.from.email, x.text, x.to.email)
          )
        );
      },
      (err) => console.log('propo')
    );
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

  openChat() {
    this.showModal = true;
  }

  sendMessage() {
    let msg = new ChatMessage(this.client.email, this.messageText, 'admins');
    this.webSocket.sendMessage(msg);
    this.messageText = '';
  }
}
