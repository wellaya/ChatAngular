import { Inject, Injectable, InjectionToken, Optional } from '@angular/core';
import * as signalR from "@microsoft/signalr";
import { take } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { ChatService } from './ChatService';

export const API_BASE_URL = new InjectionToken<string>('API_BASE_URL');

@Injectable({
  providedIn: 'root'
})
export class SignalRService {
  private baseUrl: string;

  constructor(private readonly chatService: ChatService, @Optional() @Inject(API_BASE_URL) baseUrl?: string) { 
    this.baseUrl = baseUrl !== undefined && baseUrl !== null ? baseUrl : "";
    this.hubConnection = new signalR.HubConnectionBuilder()
      .withUrl(`${environment.baseUrl}/chat`)
      .build();
  }

  private hubConnection: signalR.HubConnection;
  public messages: string[] = [];

  public startConnection = () => {
    this.hubConnection
      .start()
      .then(() => this.getConnectionId())
      .catch(err => console.log('Error while starting connection: ' + err));
    
  }

  public getConnectionId() {
    this.hubConnection.invoke('getConnectionId')
      .then((connectionId: string) => {
        this.chatService.initChat(connectionId).pipe(take(1)).subscribe();
    });
  }

  public addGroupChatListener = () => {
    this.hubConnection.on('JoinGroup', (message: string) => {
      this.messages.push(message);
    });
  }
}
