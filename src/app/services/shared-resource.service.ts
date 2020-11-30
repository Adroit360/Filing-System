import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/firestore';
import { AngularFireStorage } from '@angular/fire/storage';
import { Observable } from 'rxjs';
import {finalize} from 'rxjs/operators';
import * as firebase from 'firebase/app';
import { User } from '../models/model';
import { DbCollections } from '../services/entities.service'

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
    this.resourceCollection = afs.collection<Resource>(DbCollections.SharedResources);
    this.resources = this.resourceCollection.valueChanges();
    // this.resources;
    this.userCollection = afs.collection<User>(DbCollections.Users);
    this.users = this.userCollection.valueChanges();

  }

   getMyResources(user:string,entity){
     console.log('user from get resources ', user, " and the entity ",entity)
    this.resourceCollection = this.afs.collection(DbCollections.Entities).doc(entity).collection<Resource>(DbCollections.SharedResources,ref=>ref.where("owner",'==',user));
    this.resources = this.resourceCollection.valueChanges();
   
    return this.resources;
  }

  getMyExternalResources(user:string,entity){

    this.userCollection = this.afs.collection(DbCollections.Entities).doc(entity).collection<User>(DbCollections.Users,ref=>ref.where("email",'==',user));
    this.users = this.userCollection.valueChanges();
    return this.users;
  }

  async getAssignedResources(user:string){

  }

  private newResource:Resource;
  async createResource(resourceName:string,owner:string,entity){
    let id = this.afs.createId();
    this.newResource={
      id:id,
      name:resourceName,
      owner:owner,
      subjects:[],
      objects:[],
      date:new Date().toLocaleDateString()
    }
    
    this.afs.collection(DbCollections.Entities).doc(entity).collection(DbCollections.SharedResources).doc(id).set(this.newResource);
  }

   arrayUnion = firebase.firestore.FieldValue.arrayUnion;
   arrayRemove = firebase.firestore.FieldValue.arrayRemove;

  async AddFileToResource(fileId,resourceId,entity){
    let objects=[];
    // await firebase.firestore().collection("SharedResources").where("id","==",resourceId).get().then(a=>objects=a.docs[0].data().objects);
    // if(!objects.includes(fileId)){
      console.log("resource id",resourceId,'file id ', fileId);
      await this.afs.collection(DbCollections.Entities).doc(entity).collection(DbCollections.SharedResources).doc(resourceId).update({objects:this.arrayUnion(fileId)});
    // }  
  }

  async RemoveFileFromResource(fileId,resourceId,entity){
    await this.afs.collection(DbCollections.Entities).doc(entity).collection(DbCollections.SharedResources).doc(resourceId).update({objects:this.arrayRemove(fileId)});
  }

  async RemoveResource(resource,entity){
    await firebase.firestore().collection(DbCollections.Entities).doc(entity).collection(DbCollections.Users).where(DbCollections.SharedResources,"array-contains",resource).get().then(a=>{a.docs.forEach(doc=>{
      if(doc){
        this.afs.collection(DbCollections.Entities).doc(entity).collection(DbCollections.Users).doc(doc.data().id).update({sharedResources:this.arrayRemove(resource)});
      }  
    })});
   this.afs.collection(DbCollections.Entities).doc(entity).collection(DbCollections.SharedResources).doc(resource).delete();
    // this.getMyResources(user);
  }

  async EditResource(newName,resourceId,entity){
    await this.afs.collection(DbCollections.Entities).doc(entity).collection(DbCollections.SharedResources).doc(resourceId).update({
      name:newName
    });
  }

  // add a user to a shared resource
  async AddSubjectToResource(subjectId,resourceId,resourceName,owner,objects,entity){
      await this.afs.collection(DbCollections.Entities).doc(entity).collection(DbCollections.SharedResources).doc(resourceId).update({subjects:this.arrayUnion(subjectId)});
       this.afs.collection(DbCollections.Entities).doc(entity).collection(DbCollections.Users).doc(subjectId).update({sharedResources:this.arrayUnion({id:resourceId,name:resourceName,owner:owner,objects:objects})});   
  }

  // remove a user
  async RemoveSubjectFromResource(subjectId,resourceId,resourceName,owner,objects,entity){
    // remove resource from resource collection
    await this.afs.collection(DbCollections.Entities).doc(entity).collection(DbCollections.SharedResources).doc(resourceId).update({subjects:this.arrayRemove(subjectId)});
    // remove resource from subject's external share resources
     this.afs.collection(DbCollections.Entities).doc(entity).collection(DbCollections.Users).doc(subjectId).update({sharedResources:this.arrayRemove({id:resourceId,name:resourceName,owner:owner,objects:objects})});
  }

  GetResource(resource,entity)
  {
    let items=[];
    return this.afs.collection(DbCollections.Entities).doc(entity).collection(DbCollections.SharedResources).doc(resource).get();
  }

}
