import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/firestore';
import { AngularFireStorage } from '@angular/fire/storage';
import { Observable } from 'rxjs';
import {finalize} from 'rxjs/operators';
import * as firebase from 'firebase/app';
import { User } from '../models/model';

 interface Resource{
  id:string,
  name:string,
  owner:string,
  subjects:[],
  objects:[],
  date:string
}



@Injectable({
  providedIn: 'root'
})
export class SharedResourceService {

  private resourceCollection: AngularFirestoreCollection<Resource>;
  private resources:Observable<Resource[]>;

  private userCollection: AngularFirestoreCollection<User>;
  private users:Observable<User[]>;
  // private userResources:Observable<Resource[]>;

  constructor(private afs:AngularFirestore ) { 
    this.resourceCollection = afs.collection<Resource>('SharedResources');
    this.resources = this.resourceCollection.valueChanges();
    // this.resources;
    this.userCollection = afs.collection<User>('Users');
    this.users = this.userCollection.valueChanges();

  }

   getMyResources(user:string){
    this.resourceCollection = this.afs.collection<Resource>('SharedResources',ref=>ref.where("owner",'==',user));
    this.resources = this.resourceCollection.valueChanges();
   
    return this.resources;
  }

  getMyExternalResources(user:string){

    this.userCollection = this.afs.collection<User>('Users',ref=>ref.where("email",'==',user));
    this.users = this.userCollection.valueChanges();
    return this.users;
  }

  async getAssignedResources(user:string){

  }

  private newResource:Resource;
  async createResource(resourceName:string,owner:string){
    let id = this.afs.createId();
    this.newResource={
      id:id,
      name:resourceName,
      owner:owner,
      subjects:[],
      objects:[],
      date:new Date().toLocaleDateString()
    }
    
    this.resourceCollection.doc(id).set(this.newResource);
  }

   arrayUnion = firebase.firestore.FieldValue.arrayUnion;
   arrayRemove = firebase.firestore.FieldValue.arrayRemove;

  async AddFileToResource(fileId,resourceId){
    let objects=[];
    // await firebase.firestore().collection("SharedResources").where("id","==",resourceId).get().then(a=>objects=a.docs[0].data().objects);
    // if(!objects.includes(fileId)){
      console.log("resource id",resourceId,'file id ', fileId);
      await this.resourceCollection.doc(resourceId).update({objects:this.arrayUnion(fileId)});
    // }  
  }

  async RemoveFileFromResource(fileId,resourceId){
    await this.resourceCollection.doc(resourceId).update({objects:this.arrayRemove(fileId)});
  }

  async RemoveResource(resourceId){
   
    // await firebase.firestore().collection("SharedResources").where("parentResource","==",resourceId).get().then(a=>{a.docs.forEach(doc=>{this.resourceCollection.doc(doc.data().id).delete()})});
    this.resourceCollection.doc(resourceId).delete()
    // this.getMyResources(user);
  }

  async EditResource(newName,resourceId){
    await this.resourceCollection.doc(resourceId).update({
      name:newName
    });
  }

  // add a user to a shared resource
  async AddSubjectToResource(subjectId,resourceId,resourceName,owner){
  
      await this.resourceCollection.doc(resourceId).update({subjects:this.arrayUnion(subjectId)});
      await this.userCollection.doc(subjectId).update({sharedResources:this.arrayUnion({id:resourceId,name:resourceName,owner:owner})});
    
  }

  // remove a user
  async RemoveSubjectFromResource(subjectId,resourceId,resourceName,owner){
    await this.resourceCollection.doc(resourceId).update({subjects:this.arrayRemove(subjectId)});
    await this.userCollection.doc(subjectId).update({sharedResources:this.arrayRemove({id:resourceId,name:resourceName,owner:owner})});
  }

   GetResource(resource){
    let items=[];
    return this.resourceCollection.doc(resource).get();
  }

 
}
