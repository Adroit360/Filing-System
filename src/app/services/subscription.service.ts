import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import * as firebase from 'firebase';
import { ServerTimerService } from './server-timer.service';


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

  serverTime:any={};
  constructor(private afs:AngularFirestore,private serverTimer: ServerTimerService) {
    serverTimer.getServerTime().subscribe(result=>{
      console.log("got server time",result);
      this.serverTime = result;
    });
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
    this.setExpiryDateForTrial(entityCollection,entity,subscribeCollection,id,30);
    
  }
  // subscribe
   subscribe(entity,subscriptionLog, entityCollection,subscribeCollection,entitySubscriptionPlan,amount){
    console.log("in subscription service subscribe")
     this.setMonthlyExpiryDate(entityCollection,entity,subscribeCollection,entitySubscriptionPlan,30);
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
  async setExpiryDateForTrial(entityCollection,entity,subscribeCollection,id,duration){
    // set correct expiring date
    // this.afs.collection(entityCollection).doc(entity).collection(subscribeCollection).doc(id).get().subscribe(doc=>{
    console.log("server time",this.serverTime.time.toDate());      
      let dt = new Date(this.serverTime.time.toDate());
      console.log("first dt conver",dt)
      dt.setDate(dt.getDate()+duration);
      console.log(dt);
      this.afs.collection(entityCollection).doc(entity).collection(subscribeCollection).doc(id).update({expiringDate:dt.toDateString(),subscriptionDate: firebase.firestore.FieldValue.serverTimestamp()});
  }


    // set expiring date
    async setMonthlyExpiryDate(entityCollection,entity,subscribeCollection,entitySubscriptionPlan,duration){
      // set correct expiring date
      // this.afs.collection(entityCollection).doc(entity).collection(subscribeCollection).doc(id).get().subscribe(doc=>{
     let previousExpiringDate = new Date(entitySubscriptionPlan.expiringDate);
     
    
        let dt = new Date(this.serverTime.time.toDate());
        // if subscription is not yet expired while a new purchase is being done
        if (previousExpiringDate> dt){
          console.log("expected", previousExpiringDate)
          previousExpiringDate.setDate(previousExpiringDate.getDate()+ duration);
          dt = previousExpiringDate;
        }
        // when subscription is already expired
        else{
          console.log("unexpected")
          dt.setDate(dt.getDate()+duration);
        }
      
        this.afs.collection(entityCollection).doc(entity).collection(subscribeCollection).doc(entitySubscriptionPlan.subscriptionId).update({expiringDate:dt.toDateString(),subscriptionDate: firebase.firestore.FieldValue.serverTimestamp()});
    }

  getSubscriptionInfo(entity,entityCol,subCol){
    return this.afs.collection(entityCol).doc(entity).collection(subCol).valueChanges();
  }

 SubscriptionLogs(entity, amount,entityCol){
   console.log("inside subscription log")
   let id = this.afs.createId();
    this.afs.collection(entityCol).doc(id).set({entity:entity,amount:amount,paid:false,date:firebase.firestore.FieldValue.serverTimestamp()});
    return id;
 }

 updateSubscription(id,entityCol,entityCollection,entity){
   this.afs.collection(entityCol).doc(id).update({paid:true});
   this.afs.collection(entityCollection).doc(entity).update({activation:true});
 }

}