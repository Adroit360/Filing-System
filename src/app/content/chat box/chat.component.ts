import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.scss']
})
export class ChatComponent implements OnInit {
  chats=[{name: "mavies", email:"beans at gmail.com"},{name: "mavies", email:"beans at gmail.com"},{name: "mavies", email:"beans at gmail.com"},{name: "mavies", email:"beans at gmail.com"},{name: "mavies", email:"beans at gmail.com"}]

  constructor() { }

  ngOnInit(): void {
  }

  openChat(){
    document.getElementById('friends-list').style.display="block";
  }

  closeChat(){
    console.log("clicked")
    document.getElementById('friends-list').style.display="none";
  }

  OpenChat(i){
    console.log(i);
    document.getElementById('chatview').style.display="block";

  }

  back(){
    console.log("going back")
    document.getElementById('chatview').style.display="none";
    document.getElementById('friends-list').style.display="block";
  }

}
