import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/firestore';
import * as firebase from 'firebase/app';
import { DbCollections } from './entities.service';

interface Announcement{
  id:string,
  title:string;
  content:string;
  date:string;

}

@Injectable({
  providedIn: 'root'
})

export class AnnouncementService {

  constructor(private afs: AngularFirestore) { }

  // add new announcement
  newAnnouncement(title,content,entity){
    let id = this.afs.createId();
    let announcement: Announcement={
      id: id, title : title, content: content, date: new Date().toDateString()
    }
    this.afs.collection(DbCollections.Entities).doc(entity).collection<Announcement>(DbCollections.Announcements).doc(id).set(announcement);
  }

  // remove announcement
  removeAnnouncement(id,entity){
    this.afs.collection(DbCollections.Entities).doc(entity).collection<Announcement>(DbCollections.Announcements).doc(id).delete();
  }

  // update announcement
  updateAnnouncement(id,title,content,duration,entity){
    this.afs.collection(DbCollections.Entities).doc(entity).collection(DbCollections.Announcements).doc(id).update({title:title,content:content,duration:duration});
  }

  getValidAnnouncements(entity){

    return  this.afs.collection(DbCollections.Entities).doc(entity).collection<Announcement>(DbCollections.Announcements).valueChanges();
   
  }
}
