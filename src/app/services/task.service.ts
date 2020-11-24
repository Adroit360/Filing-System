import { Injectable, ɵisDefaultChangeDetectionStrategy } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/firestore';
import * as firebase from 'firebase/app';
import { DbCollections } from '../services/entities.service';
import { User } from '../models/model';

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

  arrayUnion = firebase.firestore.FieldValue.arrayUnion;
  arrayRemove = firebase.firestore.FieldValue.arrayRemove;
  constructor(private afs: AngularFirestore) { }

  // add task
  newTask(user,taskObj,entity){
    let id = this.afs.createId();
    let _task: Task={
      id : id,
      task: taskObj.task,
      dateCreated: new Date().toLocaleTimeString(),
      dueDate: taskObj.dueDate,
      done: taskObj.status
    };
    this.afs.collection(DbCollections.Entities).doc(entity).collection(DbCollections.Users).doc(user).update({tasks: this.arrayUnion(_task)});
  }


  // remove task
  removeTask(user,_task, entity){
    this.afs.collection(DbCollections.Entities).doc(entity).collection(DbCollections.Users).doc(user).update({tasks: this.arrayRemove(_task)});
  } 
  

  // task completed
  updateTask(user,_task, entity){
    this.afs.collection(DbCollections.Entities).doc(entity).collection(DbCollections.Users).doc(user).get().subscribe(result=>{
      result.data().tasks.forEach(task => {
        if (task.id == _task.id){
          task.done = _task.done;
        }
      });
    });
  } 

  getTasks (user,entity){
    return  this.afs.collection(DbCollections.Entities).doc(entity).collection(DbCollections.Users).doc(user).valueChanges();
  }
  
}
