import { MessageClient } from './client.model';

export class ChatMessage {
  constructor(
    public from: MessageClient,
    public text: string = '',
    public to: string = ''
  ) {}
}

export class ClientChatMessage {
  constructor(
    public from: MessageClient,
    public text: string = '',
    public to: MessageClient
  ) {}
}
