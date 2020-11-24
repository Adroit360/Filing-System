import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/firestore';
import * as firebase from 'firebase/app';
import { DbCollections } from '../services/entities.service';

interface Announcement{
  id:string,
  title:string;
  content:string;
  date:string;
  duration:number;
}

@Injectable({
  providedIn: 'root'
})

export class AnnouncementService {

  constructor(private afs: AngularFirestore) { }

  // add new announcement
  newAnnouncement(title,content,duration,entity){
    let id = this.afs.createId();
    let announcement: Announcement={
      id: id, title : title, content: content, duration:duration, date: new Date().toDateString()
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
    // let cdate = new Date(currentDate);
    // firebase.firestore().collection(DbCollections.Entities).get().then(a=>a.forEach(doc=>{
    //   let doc_date = new Date(doc.data().dateCreated);
    //   let day_diff = Math.floor((Date.UTC(cdate.getFullYear(), cdate.getMonth(), cdate.getDate()) - Date.UTC(doc_date.getFullYear(), doc_date.getMonth(), doc_date.getDate()) ) /(1000 * 60 * 60 * 24));
    //   if (day_diff>doc.data().duration){

    //   }
    // }))
  }
}
