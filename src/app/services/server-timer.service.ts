import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import * as firebase from 'firebase';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ServerTimerService {

  constructor(private database: AngularFirestore) { }

   // get server time
  getServerTime(){
  this.database.collection("ServerTime").doc("timeDoc").update({time:firebase.firestore.FieldValue.serverTimestamp()});
  
  return this.database.collection("ServerTime").doc("timeDoc").valueChanges();
}
}
