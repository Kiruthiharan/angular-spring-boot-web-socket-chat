import { Component, OnInit } from '@angular/core';
import { UserService } from '../services/user.service';
import * as Stomp from 'stompjs';
import * as SockJS from 'sockjs-client';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.scss'],
})
export class ChatComponent implements OnInit {
  public userId: number;
  public selectedUser = null;
  public message: string = ''
  public messageHistory = [];

  public users = [];

  public webSocketEndPoint = 'http://localhost:8080/chat';
  public topic: string;
  public stompClient: Stomp.Client;

  constructor(private userService: UserService, private route: ActivatedRoute, private router: Router) {}

  ngOnInit() {
    this.userId = +this.route.snapshot.params.userId;
    this.topic = '/topic/' + this.userId;
    this.connect();
    this.userService.getUsers().subscribe((users: any[]) => {
      this.users = users.filter(user => user.userId !== this.userId);
      if (users.length === 0) {
        this.router.navigate(['/']);
      }
    })
  }

  connect() {
    const ws = new SockJS(this.webSocketEndPoint);
    this.stompClient = Stomp.over(ws);
    this.stompClient.connect(
      {},
      (frame) => {
        // After connection subscribe to the topic
        this.stompClient.subscribe( this.topic, (event) => {
          this.onMessageReceived(event.body)
        });
      },
      this.onError
    );
  }

  onError(error) {
    // Do something on error
  }

  onMessageReceived(payload) {
    this.messageHistory.push(JSON.parse(payload))
  }

  onUserSelect(user: any) {
    this.selectedUser = user;
  }

  sendMessage() {
    // Construct the payload
    const payload ={
      message: this.message,
      from: +this.userId,
      to: +this.selectedUser.userId
    }
    // Send the message to the web socket
    this.stompClient.send('/app/message', {},  JSON.stringify(payload))
    // push message to the current messages
    this.messageHistory.push(payload);
    // clear message
    this.message = '';
  }
}
