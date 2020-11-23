import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/firestore';
import * as firebase from 'firebase/app';
import { DbCollections } from '../services/entities.service';

interface Task{
  id:string,
  task:string;
  dueDate:string;
  dateCreated:string;
  done:boolean;
}

@Injectable({
  providedIn: 'root'
})
export class TaskService {

  constructor(private afs: AngularFirestore) { }

  // add task
  newTask(taskObj,entity){
    taskObj.id = this.afs.createId();
    this.afs.collection(DbCollections.Entities).doc(entity).collection(DbCollections.TaskLists).doc(taskObj.id).set(taskObj);
  }


  // remove task
  removeTask(task, entity){
    this.afs.collection(DbCollections.Entities).doc(entity).collection(DbCollections.TaskLists).doc(task).delete();
  } 
  

  // task completed
  taskCompletion(task:string,state:boolean, entity:string){
    this.afs.collection(DbCollections.Entities).doc(entity).collection(DbCollections.TaskLists).doc(task).update({done:state});
  }
  
}
