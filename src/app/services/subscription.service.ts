import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import * as firebase from 'firebase';

interface Subscription{
  id:string,
  trial:boolean,
  subscriptionDate:any,
  subscriptionType:string,
  expiringDate:string
}

interface SubscriptionLogs{
    entityName:string,
    amount:string,
    date:any
}

@Injectable({
  providedIn: 'root'
})
export class SubscriptionService {

  constructor(private afs:AngularFirestore) {

  }

  // free trial subscription
  async TrialSubscription(entity,subscriptionType,entityCollection,subscribeCollection){
    // create subscription object
    let id = this.afs.createId();
    let pckg:Subscription={
      id:id,
      trial:true,
      subscriptionDate: firebase.firestore.FieldValue.serverTimestamp(),
      subscriptionType: subscriptionType,
      expiringDate: ""
    }
    // save subscription to db
    await this.afs.collection(entityCollection).doc(entity).collection(subscribeCollection).doc(id).set(pckg);

    // set trial expiring date
    this.setExpiryDate(entityCollection,entity,subscribeCollection,id,30);
    
  }
  // subscribe
  subscribe(entity,subscriptionLog, entityCollection,subscribeCollection,pckgid,amount){
    this.setExpiryDate(entityCollection,entity,subscribeCollection,pckgid,30);
    let logId = this.SubscriptionLogs(entity,amount,subscriptionLog);
    return logId;
  }

  // unsuscribe
  unsubscribe(entity, entityCollection){
    this.afs.collection(entityCollection).doc(entity).update({subscriptionActivation:false});
  }

  // change subscription -- upgrade or downgrade
  // changeSubscriptionPackage(entity,){}


  // set expiring date
  setExpiryDate(entityCollection,entity,subscribeCollection,id,duration){
    // set correct expiring date
    this.afs.collection(entityCollection).doc(entity).collection(subscribeCollection).doc(id).get().subscribe(doc=>{
      let dt = new Date(doc.data().subscriptionDate.toDate());
      dt.setDate(dt.getDate()+duration)
      this.afs.collection(entityCollection).doc(entity).collection(subscribeCollection).doc(id).update({expiringDate:dt.toDateString()});
  })
  }

  getSubscriptionInfo(entity,entityCol,subCol){
    return this.afs.collection(entityCol).doc(entity).collection(subCol).valueChanges();
  }

 SubscriptionLogs(entity, amount,entityCol){
   let id = this.afs.createId();
    this.afs.collection(entityCol).doc(id).set({entity:entity,amount:amount,paid:false,date:firebase.firestore.FieldValue.serverTimestamp()});
    return id;
 }

 updateSubscription(id,entityCol,entityCollection,entity){
   this.afs.collection(entityCol).doc(id).update({paid:true});
   this.afs.collection(entityCollection).doc(entity).update({activation:true});
 }

}