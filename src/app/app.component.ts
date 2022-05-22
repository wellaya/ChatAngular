import { Component, OnInit } from '@angular/core';
import { SignalRService } from './services/SignalRService';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'chat-web';
  sessionStatus: string ='initiating';
  
  constructor(public signalRService: SignalRService) {
    
  }

  ngOnInit(): void {
    this.initChat();
    this.signalRService.addGroupChatListener();
  }

  private initChat(): void {
    this.signalRService.startConnection();
    this.sessionStatus = "initialized";
  }
  
}
