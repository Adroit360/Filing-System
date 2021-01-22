import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/firestore';
import { AngularFireStorage } from '@angular/fire/storage';
import { BehaviorSubject, Observable } from 'rxjs';
import {finalize} from 'rxjs/operators';
import * as firebase from 'firebase/app';
import {DocumentApprovalObject } from '../app/models/model';
import { DbCollections } from './entities.service';


@Injectable({
  providedIn: 'root'
})
export class ApprovalService {

  //for thumbs up
  thumbsUp= new BehaviorSubject<any>({})

  requestBehavior= new BehaviorSubject<any>({})
  private approvalCollection: AngularFirestoreCollection<DocumentApprovalObject>;
  private approvals:Observable<DocumentApprovalObject[]>;

  // live socket for sent request
  private sentReqCollection: AngularFirestoreCollection<DocumentApprovalObject>;
  private sentRequests:Observable<DocumentApprovalObject[]>;

  // live socket for received request
  private receiveReqCollection: AngularFirestoreCollection<DocumentApprovalObject>;
  private receiveRequests:Observable<DocumentApprovalObject[]>;


  constructor(private afs:AngularFirestore,private afStorage:AngularFireStorage ) {
    // this.approvalCollection = afs.collection<DocumentApprovalObject>('Approvals');
    // this.approvals = this.approvalCollection.valueChanges();

  }

  requestapprove(index, item: any){
    this.requestBehavior.next({index,item});
  }

  //service for clciking thumbs up
  onthumbsUps(item){
    this.thumbsUp.next({item});
  }


   createApprovalRequest(request:any,entity){

    let reqDoc:DocumentApprovalObject={
      id:this.afs.createId(),
      documentId:request.documentId,
      documentName:request.documentName,
      documentUrl:request.documentUrl,
      title:request.title,
      requestMessage: request.requestMessage,
      senderId:request.senderId,
      dateCreated:request.dateCreated,
      latestApprovalDate:request.latestApprovalDate,
      approverId:request.approverId, 

      approvalStatus:false,
       dateApproved:"",
       returnedDocumentId :"",
       returnedDocumentUrl:"",
       approvedMessage:""
    }

    this.afs.collection(DbCollections.Entities).doc(entity).collection<DocumentApprovalObject>('Approvals').doc(reqDoc.id).set(reqDoc).catch(e=>{console.log(e);return false;});
  }


  // approval confirmation of document
  // upload file
  private basePath="uploads/archives"
async RespondToRequest(approvedDoc:any,entity){
    let returnedDocUrl="";
    let returnedDocId="";
    // check if response comes with a file
    if(approvedDoc.file){
      // save document to database
       await this.uploadFile(approvedDoc.file,approvedDoc,entity);
       return;
    }
    await this.afs.collection(DbCollections.Entities).doc(entity).collection<DocumentApprovalObject>('Approvals').doc(approvedDoc.id).update({
      approvalStatus:true,
      dateApproved:new Date().toLocaleString(),
      returnedDocumentId :returnedDocId,
      returnedDocumentUrl:returnedDocUrl,
      approvedMessage:approvedDoc.message
    });
  }

  GetSentRequest(user,entity){
    this.sentReqCollection = this.afs.collection(DbCollections.Entities).doc(entity).collection<DocumentApprovalObject>('Approvals',ref=>ref.where("senderId","==",user).orderBy("dateCreated","desc").limit(6));
    this.sentRequests = this.sentReqCollection.valueChanges();
    return this.sentRequests;
  }

  GetReceiveRequest(user,entity){
    this.receiveReqCollection = this.afs.collection(DbCollections.Entities).doc(entity).collection<DocumentApprovalObject>('Approvals',ref=>ref.where("approverId","==",user).orderBy("dateCreated","desc").limit(6));
    this.receiveRequests = this.receiveReqCollection.valueChanges();
    return this.receiveRequests;
  }

  RemoveRequest(reqId,entity){
    this.afs.collection(DbCollections.Entities).doc(entity).collection<DocumentApprovalObject>('Approvals').doc(reqId).delete();
  }

  
  // upload new response document
  responseDocId:string;

  async uploadFile(fileItem,docObj,entity) {
    let responseDocUrl:string="";
    const id = await this.afs.createId(); 
    const filePath = `${this.basePath}/${id}`;
    const storageRef = this.afStorage.ref(filePath);
    const uploadTask = this.afStorage.upload(filePath, fileItem);
 
    uploadTask.snapshotChanges().pipe(
      finalize(() => {
        storageRef.getDownloadURL().subscribe(downloadURL => {
          console.log('File available at', downloadURL);
          this.responseDocId = id;
          
          responseDocUrl= downloadURL;
          this.afs.collection(DbCollections.Entities).doc(entity).collection<DocumentApprovalObject>('Approvals').doc(docObj.id).update({
            approvalStatus:true,
            dateApproved:new Date().toLocaleString(),
            returnedDocumentId :id,
            returnedDocumentUrl:downloadURL,
            approvedMessage:docObj.message
          });
          console.log("successfully saved");
        });
      })
    ).subscribe();
 
    
  }
}
