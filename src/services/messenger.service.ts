import { Injectable } from '@angular/core';
import {AngularFirestore,AngularFirestoreCollection} from '@angular/fire/firestore';
import {Observable} from 'rxjs';
import {map,finalize} from 'rxjs/operators';
import * as firebase from 'firebase/app';
import {User,SystemUser,DocumentApprovalObject,Section,Directory,FileObject,ApprovalResponse,ApprovalRequest } from '../app/models/model';
import { AngularFireStorage,AngularFireStorageReference,AngularFireUploadTask } from '@angular/fire/storage';
import {AuthServiceService} from './auth-service.service';
import { EntitiesService,DbCollections } from './entities.service';



@Injectable({
  providedIn: 'root'
})

export class MessengerService {
  private usersCollection: AngularFirestoreCollection<User>;
  private users:Observable<User[]>;

  private systemUsersCollection: AngularFirestoreCollection<SystemUser>;
  private systemUsers:Observable<SystemUser[]>;
  private sectionCollection: AngularFirestoreCollection<Section>;
  // private sections:Observable<Section[]>;

  // users:any;
  approvalDocs:any;
  // storageRef : AngularFireStorageReference;
  // storageTask: AngularFireUploadTask;
  systemUser:SystemUser;

  constructor(private database: AngularFirestore,private authService:AuthServiceService,private afStorage:AngularFireStorage,private entityManager:EntitiesService) { 
    
    this.usersCollection = database.collection<User>('Users', ref=>ref.orderBy('firstName'));
    this.users = this.usersCollection.valueChanges();
      this.sectionCollection = database.collection<Section>('Sections',ref=> ref.orderBy('dateCreated'));
      this.approvalDocs = database.collection('ApprovalDocuments');
      this.systemUsersCollection = database.collection<SystemUser>('SystemUsers', ref=>ref.orderBy('name'));
  }


  // create user
  // async NewUser(firstName,lastName,email,role,entityId){
  //   let user:User={
  //     email: email,
  //     lastName:lastName,
  //     firstName:firstName,
  //     role:role,
  //     accessList:[],
  //     creationdeletionPrivilege:false,
  //     sharedResources:[],
  //     isAdmin:false
  //   };

  //   this.systemUser.email = email;
  //   this.systemUser.name = firstName+" "+lastName;
  //   this.systemUser.entity = entityId;
  //   this.systemUser.entityAccount=false;
  //   // create user in firestore database
  //   return await this.authService.signUp(user.email,"@password").then(async res=>{

  //     // save user information to the database
  //     console.log(res);
  //     if(res=="auth/email-already-in-use" || res=="auth/invalid-email"){
  //       return res;
  //     }
  //     await this.systemUsersCollection.doc(this.systemUser.email).set(this.systemUser).catch(e=>{console.log(e);return e;});
     
  //     // send password reset link
  //     this.authService.ResetPassword(email).catch(err=>{console.log("error from reset password",err);return err});
      
     
  //   });
  // }

  // // edit user
  // async updateUser(user){
  //   await this.usersCollection.doc(user.email).update({
  //     firstName: user.firstName,
  //     lastName: user.lastName, 
  //     role: user.role
  //   }).catch((err)=>{console.log(err);return err;});
  // }


  // remove user
  async removeUser(user_id){
    //await firebase.auth().delete().catch(err=>{return err});
    await this.usersCollection.doc(user_id).delete().catch(e=>{console.log(e)});
  }


  // read a user
  async getUser(userEmail,entity){  
    let user = await firebase.firestore().collection("Entities").doc(entity).collection('Users').doc(userEmail).get();
    console.log("user form msg",user.data());
    return user.data();
  }

   // read a user
   async getSystemUser(userEmail){  
    let user = await firebase.firestore().collection('SystemUsers').doc(userEmail).get();
    console.log("user form msg",user.data());
    return user.data();
  }

  _getUser(userEmail){  
    return this.usersCollection.doc(userEmail).get();
  }


  // read all users
 getUsers() {
   return this.users;
  }


  _getUsers() : Promise<any[]> {
    let users:any=[];

    return new Promise((resolve,reject)=>{
      firebase.firestore().collection("Users")
      .onSnapshot(
        function(querySnapshot) {
          users=[];
          querySnapshot.forEach(function(doc) {
              users.push(doc.data());
          });
          console.log("Current users: ", users);
          resolve(users);
          
        });
    })
     
  }


  // set user access control
  async setAccessControl(userId,resourceId){
     this.usersCollection.doc(userId).update({
       accessList:firebase.firestore.FieldValue.arrayUnion(resourceId)
     });
  }

  // revoke access
  async revokeAccess(userId,resourceId){
    this.usersCollection.doc(userId).update({
      accessList:firebase.firestore.FieldValue.arrayRemove(resourceId)
    });
  }

  // create user group

  // add a section
   newSection(section:Section){
    section.id = this.database.createId()
    this.sectionCollection.doc(section.id).set(section).then(()=>{
      this.sectionCollection.doc(section.id).collection("Archives");
    });
    
  }

  //remove a section
  async removeSection(sectionId){ 
    await this.sectionCollection.doc(sectionId).delete().catch(err=>{console.log(err);return false;});
    return true;
  }

  // change section name
  async changeSectionName(sectionId,newName){
    await this.sectionCollection.doc(sectionId).update({
      name:newName
    });

    // return this.sections;
  }

  

  async getSection(sectionId:string){
    const section =[];
     await firebase.firestore().collection('Sections').where('id','==',sectionId).get().then(a=>{a.docs.forEach(doc=>{section.push(doc.data());})});

     return section[0];
  }

   getAllSections(){
    let sections = []
    firebase.firestore().collection('Sections').get().then(a=>{a.docs.forEach(doc=>{sections.push(doc.data());console.log("from msg",sections);})});
    
    return sections;
  }

  // an access list contains the id list of sections available to a user
  // this method loads the sections accessible to a user defined by the access control list
  

  // get content of a directory
   getDirectoryContent(sectionId,directoryId,accessList){
    let contents=[];
     firebase.firestore().collection('Sections').doc(sectionId).collection("archives").where('parentId','==',directoryId).get().then(a=>{a.docs.forEach(doc=>{
      if (doc.data().parentId == directoryId){
        if(doc.data().itemType=="folder" && doc.data().lock){
            if(accessList.includes(doc.data().id)){
              contents.push(doc.data());
            }         
        }else{
          contents.push(doc.data());
        }   
      }
     
    });});

    return contents;
  }


  // get content of a general
   getGeneralcontent(){
    let contents=[];
     firebase.firestore().collection('Sections').doc("general").collection("archives").get().then(a=>{a.docs.forEach(doc=>{
      
      contents.push(doc.data());
     
    });console.log(contents)});

    return contents;
  }

  // delete directory 
  async removeDirectory(sectionId,directoryId,deletionPrivilege){
    if(deletionPrivilege){
      await firebase.firestore().collection('Sections').doc(sectionId).collection("Archives").where('parentId','==',directoryId)
      .get().then(a=>{a.docs.forEach(doc=>{
        this.sectionCollection.doc(sectionId).collection("Archives").doc(doc.data().id).delete();
      })});
        
      await this.sectionCollection.doc(sectionId).collection("Archives").doc(directoryId).delete().catch(e=>{console.log(e); return {success:false,response:e};});
      return {success:true,response:"object deleted successfully"};
    }

    return {success:false,response:"Permission denied"};
  }

  // add object to directory
  async newDirectory(sectionId:string, directory:Directory){
    directory.id = this.database.createId();
    const res = await this.sectionCollection.doc(sectionId).collection("Archives").doc(directory.id).set(directory);

    return res;
  }


  // access list of a user
  async getUserAccessList(userId){
      let accessList=[];
      await firebase.firestore().collection('Users').where('id','==',userId).get().then(a=>{a.docs.forEach(doc=>{accessList.push(doc.data());})});

      return accessList[0].access;
  }

  // upload file
  private basePath="uploads/archives"
  uploadFile(fileItem,userId,sectionId,directoryId): Observable<number> {
    let file:FileObject;
    const id = this.database.createId(); 
    const filePath = `${this.basePath}/${id}`;
    const storageRef = this.afStorage.ref(filePath);
    const uploadTask = this.afStorage.upload(filePath, fileItem);
 
    uploadTask.snapshotChanges().pipe(
      finalize(() => {
        storageRef.getDownloadURL().subscribe(downloadURL => {
          console.log('File available at', downloadURL);
          file ={
            id:id,
            name:fileItem.name,
            itemType:'file',
            contentType:fileItem.type,
            lastUploadUser:userId,
            lastUpdated:new Date().toLocaleDateString(),
            url:downloadURL,
            parentId:directoryId,
            owner:userId
          }
        this.sectionCollection.doc(sectionId).collection(DbCollections.Archives).doc(file.id).set(file).catch(e=>{console.log(e); return e;});
          
        });
      })
    ).subscribe();
 
    return uploadTask.percentageChanges();
  }
 
  // get subscription packages
  getSubscriptionPlans(){
    return this.database.collection(DbCollections.SubscriptionPlan).valueChanges();
  }


  
}
