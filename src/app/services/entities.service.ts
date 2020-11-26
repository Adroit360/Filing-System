import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/firestore';
import * as firebase from 'firebase/app';
import {User,SystemUser } from '../models/model';
import {AuthServiceService} from '../services/auth-service.service';
import { ChatService } from '../services/chat.service';

export interface Entity{
  id:string,
  companyName:string,
  email:string,
  contact:string,
  country:string,
  dateCreated:string,
  operation:string,
  active:Boolean
}

export enum DbCollections{
  Entities ="Entities",
  Users="Users",
  Archives= "Archives",
  SystemUsers="SystemUsers",
  SharedResources="SharedResources",
  Announcements="Announcements",
  TaskLists = "TaskLists",
  Chats = "Chats",
  Sections="Sections"
}

@Injectable({
  providedIn: 'root'
})

export class EntitiesService {
  private entityCollection: AngularFirestoreCollection<Entity>;
  entity:Entity;
 
  constructor(private afs:AngularFirestore,private authService:AuthServiceService,private chatManager:ChatService) {
    this.entityCollection = afs.collection<Entity>(DbCollections.Entities,ref=> ref.orderBy('dateCreated'));
  }

  // create new entity account
  NewEntity(name,email,contact,country,dateCreated,entityOperations){
    this.entity.id = this.afs.createId(),
    this.entity.companyName = name;
    this.entity.contact = contact;
    this.entity.country = country;
    this.entity.email = email;
    this.entity.dateCreated = dateCreated;
    this.entity.active = true;
    this.entity.operation = entityOperations;

    this.entityCollection.doc(this.entity.id).set(this.entity);
  }

  // deactivate an organisation's account
  DeactivateEntity(entityId:string,statusCommand:boolean)
  {
    this.entityCollection.doc(entityId).update({active:statusCommand});
  }

  // update entity info
  UpdateEntityInfo(entityId,name,email,contact,country,dateCreated,entityOperations,status){
    this.entityCollection.doc(entityId).get().subscribe(entity=>{
     if (entity){
        entity.data().companyName = name;
        entity.data().contact = contact;
        entity.data().country = country;
        entity.data().email = email;
        entity.data().dateCreated = dateCreated; 
        entity.data().active = status;
        entity.data().operation = entityOperations

        this.entityCollection.doc(entityId).update(this.entity);
      }
    });
  }

  // delete entity account
  removeEntity(entityId){
    firebase.firestore().collection(DbCollections.Entities).doc(entityId).collection("System").get().then(a=>a.docs.forEach(doc=>{
      this.entityCollection.doc(entityId).collection("System").doc(doc.data().id).delete();
    })).then(()=> this.entityCollection.doc(entityId).delete()); 
  }

  async NewUser(firstName,lastName,email,role,entity){
    let user:User={
      email: email,
      lastName:lastName,
      firstName:firstName,
      role:role,
      accessList:[],
      creationdeletionPrivilege:false,
      sharedResources:[],
      isAdmin:false,
      tasks:[],
      recentFolders:[]
    };

    let systemUser:SystemUser={
      email : email,
      name : firstName+" "+lastName,
      entity : entity,
      entityAccount:false
    }
    
    // create user in firestore database
    return  this.authService.signUp(user.email,"@password").then(async res=>{

      // save user information to the database
      console.log(res);
      if(res=="auth/email-already-in-use" || res=="auth/invalid-email"){
        return res;
      }
      this.afs.collection(DbCollections.SystemUsers).doc(systemUser.email).set(systemUser).catch(e=>{console.log(e);return e;}).then(()=>{
        this.afs.collection(DbCollections.Entities).doc(entity).collection<User>(DbCollections.Users).doc(user.email).set(user);
      }).then(()=>{
           // send password reset link
      this.authService.ResetPassword(email).catch(err=>{console.log("error from reset password",err);return err});
      });
      

     
    });
  }

  // get a single user
  async getEntityUser(userEmail,entityId){
    let user = await firebase.firestore().collection(DbCollections.Entities).doc(entityId).collection(DbCollections.Users).doc(userEmail).get();
    console.log("user form msg",user.data());
    return user.data();
  }

    // get a single user
    _getEntityUser(userEmail,entityId){
      return this.afs.collection(DbCollections.Entities).doc(entityId).collection<User>(DbCollections.Users).doc(userEmail).valueChanges();
    }

  // get all users of an entity
  getEntityUsers(entity){
    return  this.entityCollection.doc(entity).collection(DbCollections.Users).valueChanges();
  }

  // remove a user
  removeEntityUser(user,entity){
    this.entityCollection.doc(entity).collection(DbCollections.Users).doc(user).delete().then(()=>{
      this.afs.collection(DbCollections.SystemUsers).doc(user).delete();
      // yet to implement  removal from the firebase authentication table
    });
  }

  // update user info
  updateUser(user,entity){
    this.entityCollection.doc(entity).collection(DbCollections.Users).doc(user.email).update({
      firstName: user.firstName,
      lastName: user.lastName, 
      role: user.role
    }).catch((err)=>{console.log(err);return err;});
  }

  // set user access control
  async setAccessControl(userId,resourceId,entity){
    this.afs.collection(DbCollections.Entities).doc(entity).collection(DbCollections.Users).doc(userId).update({
      accessList:firebase.firestore.FieldValue.arrayUnion(resourceId)
    });
 }

 // revoke access
 async revokeAccess(userId,resourceId,entity){
  this.afs.collection(DbCollections.Entities).doc(entity).collection(DbCollections.Users).doc(userId).update({
     accessList:firebase.firestore.FieldValue.arrayRemove(resourceId)
   });
 }

sendMessage(msg,user,receiver,entity){
   this.chatManager.sendMessage(user,receiver,msg,entity);
}

// get messages
getChatMessages(user,targetUser,entity){
    return this.chatManager.getChatMessage(user,targetUser,entity);
  }

}
