import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.scss'],
})
export class ChatComponent implements OnInit {
  public selectedUser = null;
  public message = ''

  constructor() {}

  ngOnInit() {}

  onUserSelect(user: any) {
    // Assign clicked user to selected user
    this.selectedUser = user;
    // Establish a web socket connection with the selected user
  }

  sendMessage() {
    // Send message to the socket connection

    // push message to the current messages

    // clear message
  }
}
