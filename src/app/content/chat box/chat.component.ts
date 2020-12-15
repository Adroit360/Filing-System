import { Component, OnInit } from '@angular/core';
import { EntitiesService } from '../../services/entities.service';
import { DataService }  from '../../services/data.service';

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.scss']
})
export class ChatComponent implements OnInit {

  date = new Date().toDateString();
  entityUsers:any=[];
  chatRecipient:any;
  textMessage:string="";
  chats:any={};
  currentUser:string;
  currentUserPhoto:any;
  Num="6";
  mySound;
  constructor(private entityManager:EntitiesService,private dataManager:DataService) {
    entityManager.getEntityUsers(dataManager.getEntity()).subscribe(result=>this.entityUsers = result);
    this.currentUser = this.dataManager.getActiveUser().email;
    this.currentUserPhoto = this.dataManager.getActiveUser().photo;
  }

  ngOnInit(): void {
  }
  //SOUND FOR CHAT
  onSound(){
    let audio = new Audio();
    audio.src = "../../../assets/notification.mp3";
    audio.load();
    audio.play();
  }
//OPeningthe chat list
  openChat(){
    document.getElementById('friends-list').style.display="block";
   // this.onSound ();
  }

  closeChat(){
    console.log("clicked")
    document.getElementById('friends-list').style.display="none";
  }

  async OpenChat(recipient){
    var objDiv = document.getElementById("sendMess");
    setTimeout(
            ()=>{
              objDiv.scrollTop = objDiv.scrollHeight;
              // console.log(objDiv.scrollHeight);
            },200)

    this.chatRecipient =  recipient;

    if(recipient.email in this.chats==false){
      this.getMessage(recipient.email);
      console.log("array already not exist")
    }else{console.log("email in array")}
    document.getElementById('chatview').style.display="flex";


  }

  back(){
    console.log("going back")
    document.getElementById('chatview').style.display="none";
    document.getElementById('friends-list').style.display="block";
  }

  sendMessage(recipient){
    this.entityManager.sendMessage(this.textMessage,this.dataManager.getActiveUser().email,recipient,this.dataManager.getEntity());
    this.textMessage = "";
    setTimeout(()=>{
      let element =  document.getElementById("sendMess");
      let scrollHeight = element.scrollHeight + 100;
      console.log("scrollHeight",scrollHeight);
      element.scrollTo(0,scrollHeight);
    },200)

  }

  getMessage(targetUser){
        this.entityManager.getChatMessages(this.dataManager.getActiveUser().email,targetUser,this.dataManager.getEntity()).subscribe(result=>{
        this.chats[targetUser] = result;
        console.log("array of chat ",this.chats[targetUser]);
        console.log("main result ",result);
        setTimeout(()=>{
          let element =  document.getElementById("sendMess");
          let scrollHeight = element.scrollHeight + 100;
          console.log("scrollHeight",scrollHeight);
          element.scrollTo(0,scrollHeight);
        },200)
        });
  }

}
