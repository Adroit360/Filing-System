import { Injectable } from '@angular/core';
import { DbCollections } from './entities.service';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/firestore';
import * as firebase from 'firebase/app';
import {User,SystemUser } from '../app/models/model';

interface Chat {
  id:string;
  sender:string;
  receiver:string;
  message:string;
  read:boolean;
  date:any;
  time:string;
  commonChatString:string;
}


@Injectable({
  providedIn: 'root'
})


export class ChatService {
  constructor(private afs: AngularFirestore) { }
  // send text message
  sendMessage(sender,receiver,message,entity){
    let id = this.afs.createId();
    let  chat:Chat={
      id : id,
      sender: sender,
      receiver: receiver,
      message: message,
      date: firebase.firestore.FieldValue.serverTimestamp(),
      time: new Date().toLocaleTimeString(),
      read:false,
      commonChatString: this.formCommonStringId(sender,receiver)
    }
    // store msg to sender
    this.afs.collection(DbCollections.Entities).doc(entity).collection(DbCollections.Users).doc(sender).collection(DbCollections.Chats).doc(id).set(chat);
     // send msg to receiver
     this.afs.collection(DbCollections.Entities).doc(entity).collection(DbCollections.Users).doc(receiver).collection(DbCollections.Chats).doc(id).set(chat);
  }

  // read messages
  getChatMessage(user,targetUser,entity){
    let commonStr = this.formCommonStringId(user,targetUser);
    return this.afs.collection(DbCollections.Entities).doc(entity).collection(DbCollections.Users).doc(user).collection<Chat>(DbCollections.Chats,ref=>ref.where("commonChatString","==",commonStr).orderBy('date')).valueChanges(); 
  }

  private formCommonStringId(sender,receiver){
    let commonStr="";
    if (sender>receiver){
      commonStr = sender+receiver;
    }else  {
      commonStr = receiver+sender;
    }
    return commonStr
  }

  setChat_as_read(id,user,entity){
    this.afs.collection(DbCollections.Entities).doc(entity).collection(DbCollections.Users).doc(user).collection<Chat>(DbCollections.Chats).doc(id).update({read:true}); 
  }

  getUnreadMessages(user,entity){
    return this.afs.collection(DbCollections.Entities).doc(entity).collection(DbCollections.Users).doc(user).collection<Chat>(DbCollections.Chats,ref=>ref.where("receiver","==",user).where("read","==",false).orderBy('date')).valueChanges(); 
  
  }

}
