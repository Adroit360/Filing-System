// 
// This file gets the Konvy zoom configurations (signatureEndpoint,leave URL, apiKey)
// 
import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/firestore';

interface MeetingConfig{
  endpoint:string,
  leaveUrl:string,
  apiKey:string
}

@Injectable({
  providedIn: 'root'
})
export class MeetingsService {
  private meetingCol: AngularFirestoreCollection<MeetingConfig>;
  constructor(private afs:AngularFirestore) { 
    
  }

  getKonvyMeetingConfig(){
    return this.afs.collection<MeetingConfig>("ZoomConfig").doc('config').valueChanges();
  }
}
