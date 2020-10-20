import { Injectable } from '@angular/core';
import {AngularFirestore,AngularFirestoreCollection} from '@angular/fire/firestore';
import {Observable} from 'rxjs';
import {map,finalize} from 'rxjs/operators';
import * as firebase from 'firebase/app';
import {User,DocumentApprovalObject,Section,Directory,FileObject,ApprovalResponse,ApprovalRequest } from '../models/model';
import { AngularFireStorage,AngularFireStorageReference,AngularFireUploadTask } from '@angular/fire/storage';
import {AuthServiceService} from '../services/auth-service.service';



@Injectable({
  providedIn: 'root'
})

export class MessengerService {
  private usersCollection: AngularFirestoreCollection<User>;
  //  private users:Observable<User[]>;
  private sectionCollection: AngularFirestoreCollection<Section>;
  // private sections:Observable<Section[]>;

  users:any;
  approvalDocs:any;
  // storageRef : AngularFireStorageReference;
  // storageTask: AngularFireUploadTask;

  constructor(private database: AngularFirestore,private authService:AuthServiceService,private afStorage:AngularFireStorage) { 
      this.users = database.collection('Users');
      this.sectionCollection = database.collection<Section>('Sections',ref=> ref.orderBy('dateCreated'));
      this.approvalDocs = database.collection('ApprovalDocuments');
  }

  //  private basePath="uploads/archives/uy"
  // async uploadEvent(uploadFile:any){
  //   let fileUpload:any={}
  //   const filePath = `${this.basePath}/${uploadFile.name}`;
  //   const storageRef = this.afStorage.ref(filePath);
  //   const uploadTask = this.afStorage.upload(filePath, uploadFile);

  //   uploadTask.snapshotChanges().pipe(
  //         finalize(() => {
  //           storageRef.getDownloadURL().subscribe(downloadURL => {
  //             console.log('File available at', downloadURL);
  //             fileUpload={url: downloadURL, name: uploadFile.name};
  //            console.log("what will be saved in the db",fileUpload);
              
  //           });
  //         })
  //       ).subscribe();
  // }


  // create user
  async NewUser(firstName,lastName,email,role){
    let user:User={
      email: email,
      lastName:lastName,
      firstName:firstName,
      role:role,
      accessList:[],
      deletionPrivilege:false
    }
    
    // create user in firestore database
    return await this.authService.signUp(user.email,"@password").then(async res=>{

      // save user information to the database
      console.log(res);
      if(res=="auth/email-already-in-use" || res=="auth/invalid-email"){
        return res;
      }
      await this.users.doc(user.email).set(user).then(()=>{
        // send password reset link
        this.authService.ResetPassword(email).catch(err=>{console.log("error from reset password",err);return err});
      })
      .catch(e=>{console.log(e); return e;});
 
    });
  }

  // edit user
  async updateUser(user){
    await this.users.doc(user.email).update({
      firstName: user.firstName,
      lastName: user.lastName, 
      role: user.role
    }).catch((err)=>{console.log(err);return err;});
  }


  // remove user
  async removeUser(user_id){
    //await firebase.auth().delete().catch(err=>{return err});
    await this.users.doc(user_id).delete().catch(e=>{console.log(e)});
  }


  // read a user
  async getUser(user_id){  
    let va= await this.users.doc(user_id).get();
  }


  // read all users
  async _getUsers() {
    var users:any=[];
    
    await firebase.firestore().collection("Users")
    .onSnapshot(
      function(querySnapshot) {

        querySnapshot.forEach(function(doc) {
            users.push(doc.data());
        });
        console.log("Current users: ", users);
        return users;
      }
      );
  }


  getUsers() : Promise<any[]> {
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
     this.users.doc(userId).update({
       accessList:firebase.firestore.FieldValue.arrayUnion(resourceId)
     });
  }

  // revoke access
  async revokeAccess(userId,resourceId){
    this.users.doc(userId).update({
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
  async loadSectionByAccess(accessList){
    let access_sections=[];
    // let accessList = await this.getUserAccessList(userId);
    await firebase.firestore().collection('Sections').get().then(a=>{a.docs.forEach(doc=>{
      if (accessList.includes(doc.id) ){
        access_sections.push({id:doc.data().id,name:doc.data().name});
      }
     
    });});

    return access_sections;
  }

  // get content of a directory
  async getDirectoryContent(sectionId,directoryId,accessList){
    let contents=[];
    await firebase.firestore().collection('Sections').doc(sectionId).collection("Archives").where('parentId','==',directoryId).get().then(a=>{a.docs.forEach(doc=>{
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
        this.sectionCollection.doc(sectionId).collection("Archives").doc(file.id).set(file).catch(e=>{console.log(e); return e;});
          
        });
      })
    ).subscribe();
 
    return uploadTask.percentageChanges();
  }
 
// create document approval request
async createApprovalRequest(request:ApprovalRequest){

  let reqDoc:DocumentApprovalObject={
    id:this.database.createId(),
    documentId:request.documentId,
    documentName:request.documentName,
    documentUrl:request.documentId,
    requestMessage: request.requestMessage,
    senderId:request.senderId,
    senderName: request.senderName,
    dateCreated:request.dateCreated,
    latestApprovalDate:request.latestApprovalDate,
    approverId:request.approverId,

    approvalStatus:0,
     dateApproved:"",
     returnedDocumentId :"",
     returnedDocumentUrl:"",
     approvedMessage:""
  }
  
  await this.approvalDocs.doc(reqDoc.id).set(reqDoc).catch(e=>{console.log(e);return false;});

  return true;
}


// approval confirmation of document
async setApprovalOnRequest(approvedDoc:ApprovalResponse){
  let returnedDocUrl="";
  let returnedDocId="";
  // check if response comes with a file
  if(approvedDoc.returnedDocument){
    // save document to database
  }
  await this.approvalDocs.where('id','==',approvedDoc.requestId).update({
    approvalStatus:approvedDoc.approvalResult,
    dateApproved:approvedDoc.dateApproved,
    returnedDocumentId :returnedDocId,
    returnedDocumentUrl:returnedDocUrl, 
    approvedMessage:approvedDoc.approvedMessage
  });
}

}
