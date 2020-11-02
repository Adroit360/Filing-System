import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/firestore';
import { AngularFireStorage } from '@angular/fire/storage';
import { BehaviorSubject, Observable } from 'rxjs';
import {finalize} from 'rxjs/operators';
import * as firebase from 'firebase/app';

interface Approval{
  id:string,
  title:string,
  message:string,
  dueDate:string,
  fileId:string,
  approveStatus:boolean,
  returnedDoc:string,
  date:string
}

@Injectable({
  providedIn: 'root'
})
export class ApprovalService {

  requestApproval= new BehaviorSubject<any>({})
  constructor() { }


  requestapprove(index, item: any){
    this.requestApproval.next({index,item});
  }
}
