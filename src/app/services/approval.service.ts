import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/firestore';
import { AngularFireStorage } from '@angular/fire/storage';
import { BehaviorSubject, Observable } from 'rxjs';
import {finalize} from 'rxjs/operators';
import * as firebase from 'firebase/app';
import {DocumentApprovalObject } from '../models/model';


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


  constructor(private afs:AngularFirestore ) {
    this.approvalCollection = afs.collection<DocumentApprovalObject>('Approvals');
    this.approvals = this.approvalCollection.valueChanges();

  }

  requestapprove(index, item: any){
    this.requestBehavior.next({index,item});
  }

  //service for clciking thumbs up
  onthumbsUps(item){
    this.thumbsUp.next({item});
  }


   createApprovalRequest(request:any){

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

    this.approvalCollection.doc(reqDoc.id).set(reqDoc).catch(e=>{console.log(e);return false;});
  }


  // approval confirmation of document
async setApprovalOnRequest(approvedDoc:any){
    let returnedDocUrl="";
    let returnedDocId="";
    // check if response comes with a file
    if(approvedDoc.returnedDocument){
      // save document to database
    }
    await this.approvalCollection.doc(approvedDoc.id).update({
      approvalStatus:approvedDoc.approvalResult,
      dateApproved:approvedDoc.dateApproved,
      returnedDocumentId :returnedDocId,
      returnedDocumentUrl:returnedDocUrl,
      approvedMessage:approvedDoc.approvedMessage
    });
  }

  GetSentRequest(user){
    this.sentReqCollection = this.afs.collection<DocumentApprovalObject>('Approvals',ref=>ref.where("senderId","==",user));
    this.sentRequests = this.sentReqCollection.valueChanges();
    return this.sentRequests;
  }

  GetReceiveRequest(user){
    this.receiveReqCollection = this.afs.collection<DocumentApprovalObject>('Approvals',ref=>ref.where("approverId","==",user));
    this.receiveRequests = this.receiveReqCollection.valueChanges();
    return this.receiveRequests;
  }

  RemoveRequest(reqId){
    this.approvalCollection.doc(reqId).delete();
  }
}
