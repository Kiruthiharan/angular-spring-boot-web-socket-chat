import { Component, OnInit } from '@angular/core';
import { ChatService } from '../services/chat.service';
import { UserService } from '../services/user.service';
import * as Stomp from 'stompjs';
import * as SockJS from 'sockjs-client';

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.scss'],
})
export class ChatComponent implements OnInit {
  public userId;
  public selectedUser = null;
  public message = ''
  public messageHistory = [
    { from: 1, to: 2, message: 'Hi dude, wassup', date: new Date()},
    { from: 2, to: 1, message: 'Nothing much dude', date: new Date()},
  ];

  public users = [];

  webSocketEndPoint = 'http://localhost:8080/ws';
  topic = '/topic/chat';
  stompClient: any;

  constructor(private userService: UserService, private chatService: ChatService) {}

  ngOnInit() {
    this.connect();
    this.userId = 1;
    this.userService.getUsers().subscribe((users: any[]) => {
      this.users = users;
    })
  }

  connect() {
    const ws = new SockJS(this.webSocketEndPoint);
    this.stompClient = Stomp.over(ws);
    this.stompClient.connect(
      {},
      (frame) => {
        this.stompClient.subscribe(this.topic, (event) => {
          console.log(event);
        });
      },
      () => {}
    );
  }


  onUserSelect(user: any) {
    // Assign clicked user to selected user
    this.selectedUser = user;
    // Establish a web socket connection with the selected user
  }

  sendMessage() {
    // Send message to the socket connection
    console.log(this.message)
    this.chatService.sendMessage(this.message).subscribe();
    // push message to the current messages

    // clear message
  }
}
