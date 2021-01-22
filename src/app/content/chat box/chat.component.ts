import { Component, OnInit } from '@angular/core';
import { EntitiesService } from '../../../services/entities.service';
import { DataService }  from '../../../services/data.service';

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
  unReadMessages: any=[];
  unReadMessagesEmail:any=[];
  filter:string="";

  constructor(private entityManager:EntitiesService,private dataManager:DataService) {
    entityManager.getEntityUsers(dataManager.getEntity()).subscribe(result=>{
      // if(this.filter.length>0){
      //   this.entityUsers=[];
          
      //     result.forEach(doc=>{
      //       if (doc.firstName.toLowerCase==this.filter.toLowerCase()){
      //         this.entityUsers.push(doc);
      //       }
      //     })
      // }else{
        this.entityUsers=[];
          
          result.forEach(doc=>{
            if (doc.email!=this.dataManager.getActiveUser().email){
              this.entityUsers.push(doc);
            }
          })
      // }
    });
    this.currentUser = this.dataManager.getActiveUser().email;
    // get user photo
    this.currentUserPhoto = this.dataManager.getActiveUser().photo;
    // get unread messages
    this.entityManager.getUnreadChats(this.currentUser,this.dataManager.getEntity()).subscribe(result=>{
      this.unReadMessages = result;
      this.unReadMessagesEmail=[];
      result.forEach(element => {
        this.unReadMessagesEmail.push(element.sender);
      });
      console.log("these are unread messages",this.unReadMessages);
    })
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
    
    this.dataManager.set_Chatbox_to_open();
   // this.onSound ();
  }

  closeChat(){
    console.log("clicked")
    document.getElementById('friends-list').style.display="none";
    this.dataManager.set_Chatbox_to_close();
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
    this.dataManager.set_is_chatArea_to_in();

  }

  back(){
    console.log("going back")
    document.getElementById('chatview').style.display="none";
    document.getElementById('friends-list').style.display="block";
    this.dataManager.set_is_chatArea_to_out();
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

  // variable checks first time chatbox is opened or not
  firstTimeChatOpen:boolean=true;
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

        // set message as read property is true if chat area is open
        // console.log("chat area is ", this.dataManager.is_chatArea,result[result.length-1].receiver);
        if(this.firstTimeChatOpen){
          for(let i=0;i<this.unReadMessages.length;i++){
            // if unread message list contains messages of target chat parner, update messages as read
            if(this.unReadMessages[i].sender==targetUser){
              this.entityManager.set_chat_as_read(this.unReadMessages[i].id,this.dataManager.getActiveUser().email,this.dataManager.getEntity());
            }
            console.log("all messages set");
          }
        }else{
          if(this.dataManager.is_chatArea && result[result.length-1].receiver==this.dataManager.getActiveUser().email){
            this.entityManager.set_chat_as_read(result[result.length-1].id,this.dataManager.getActiveUser().email,this.dataManager.getEntity());
            console.log("set last message as read");
          }
        }
       
        });     
  }

  searchUser(searchParam){
    this.entityManager.getEntityUsers(this.dataManager.getEntity()).subscribe(result=>{
      if(searchParam.length>0){
        this.entityUsers=[];
          
          result.forEach(doc=>{
            if (doc.firstName.toLowerCase().includes(searchParam.toLowerCase()) && doc.email!=this.dataManager.getActiveUser().email|| doc.lastName.toLowerCase().includes(searchParam.toLowerCase()) && doc.email!=this.dataManager.getActiveUser().email){
              this.entityUsers.push(doc);
            }
          })
      }else{
        this.entityUsers=[];
          
          result.forEach(doc=>{
            if (doc.email!=this.dataManager.getActiveUser().email){
              this.entityUsers.push(doc);
            }
          })
      }
    });
  }
}
