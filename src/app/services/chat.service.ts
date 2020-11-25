import { Injectable } from '@angular/core';
import { DbCollections } from '../services/entities.service';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/firestore';
import * as firebase from 'firebase/app';
import {User,SystemUser } from '../models/model';

interface Chat {
  id:string;
  sender:string;
  receiver:string;
  message:string;
  read:boolean;
  date:string;
  time:string;
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
      date: new Date().toLocaleDateString(),
      time: new Date().toLocaleTimeString(),
      read:false
    }
    this.afs.collection(DbCollections.Entities).doc(entity).collection(DbCollections.Chats).doc(id).set(chat);
  }

  // read messages
  getMessage(user,entity){
    return this.afs.collection(DbCollections.Entities).doc(entity).collection<User>(DbCollections.Chats,ref => ref.where("receiver","==",user).where("sender","==",user)).valueChanges();
  }

}
