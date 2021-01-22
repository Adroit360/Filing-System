import { Injectable, ɵisDefaultChangeDetectionStrategy } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/firestore';
import * as firebase from 'firebase/app';
import { DbCollections } from './entities.service';
import { User } from '../app/models/model';
import { NewTask } from '../app/interface/newTask.interface';

interface Task{
  id:string,
  task:string;
  dueDate:string;
  dateCreated:string;
  done:boolean;
}

interface TaskGroup{
  id:string,
  name:string,
  tasks:[],
  date:string,
  default:boolean,
  count:number
}

@Injectable({
  providedIn: 'root'
})
export class TaskService implements NewTask {

  arrayUnion = firebase.firestore.FieldValue.arrayUnion;
  arrayRemove = firebase.firestore.FieldValue.arrayRemove;
  constructor(private afs: AngularFirestore) { }

  // add task
  newTask(user,taskObj,taskGrp,entity){
    let id = this.afs.createId();
    let _task: Task={
      id : id,
      task: taskObj.task,
      dateCreated: new Date().toDateString(),
      dueDate: taskObj.dueDate,
      done: taskObj.status
    };
    this.afs.collection(DbCollections.Entities).doc(entity).collection(DbCollections.Users).doc(user).collection(DbCollections.Tasks).doc(taskGrp).update({tasks: this.arrayUnion(_task)});
    return this.afs.collection(DbCollections.Entities).doc(entity).collection(DbCollections.Users).doc(user).collection(DbCollections.Tasks).valueChanges();
  }



  // remove task
  removeTask(user,_task,taskGrp, entity){
    // decrease task completed by one
    if(_task.done){
      this.afs.collection(DbCollections.Entities).doc(entity).collection(DbCollections.Users).doc(user).collection(DbCollections.Tasks).doc(taskGrp).update({count:firebase.firestore.FieldValue.increment(-1) });
    }
    // remove task from task group
    this.afs.collection(DbCollections.Entities).doc(entity).collection(DbCollections.Users).doc(user).collection(DbCollections.Tasks).doc(taskGrp).update({tasks: this.arrayRemove(_task)});
   
    return this.afs.collection(DbCollections.Entities).doc(entity).collection(DbCollections.Users).doc(user).collection(DbCollections.Tasks).valueChanges();
  } 
  

  // task completed
  updateTask(user,_task,taskGrp, entity){
    this.afs.collection(DbCollections.Entities).doc(entity).collection(DbCollections.Users).doc(user).collection(DbCollections.Tasks).doc(taskGrp).get().subscribe(result=>{
      result.data().tasks.forEach(task => {
        if (task.id == _task.id){
          this.afs.collection(DbCollections.Entities).doc(entity).collection(DbCollections.Users).doc(user).collection(DbCollections.Tasks).doc(taskGrp).update({tasks: this.arrayRemove(task)});
          this.afs.collection(DbCollections.Entities).doc(entity).collection(DbCollections.Users).doc(user).collection(DbCollections.Tasks).doc(taskGrp).update({tasks: this.arrayUnion(_task)});
          if(_task.done){
            this.afs.collection(DbCollections.Entities).doc(entity).collection(DbCollections.Users).doc(user).collection(DbCollections.Tasks).doc(taskGrp).update({count:firebase.firestore.FieldValue.increment(1) });
          }else{
            this.afs.collection(DbCollections.Entities).doc(entity).collection(DbCollections.Users).doc(user).collection(DbCollections.Tasks).doc(taskGrp).update({count:firebase.firestore.FieldValue.increment(-1) });
          }
        }
      });
    });
  } 

  
// create new task group
newTaskGroup(name,defaultStatus,user,entity){
  let taskGrp : TaskGroup={
    id: this.afs.createId(),
    name: name,
    default:defaultStatus,
    tasks:[],
    date: new Date().toDateString(),
    count:0
  }
  this.afs.collection(DbCollections.Entities).doc(entity).collection(DbCollections.Users).doc(user).collection(DbCollections.Tasks).doc(taskGrp.id).set(taskGrp);
}

// remove task group
removeTaskGroup(taskGrpId,user,entity){
  this.afs.collection(DbCollections.Entities).doc(entity).collection(DbCollections.Users).doc(user).collection(DbCollections.Tasks).doc(taskGrpId).delete();
}

// get group tasks
getTaskGroups(user, entity){
  return this.afs.collection(DbCollections.Entities).doc(entity).collection(DbCollections.Users).doc(user).collection(DbCollections.Tasks).valueChanges();
}

  getTasks (user,entity){
    return  this.afs.collection(DbCollections.Entities).doc(entity).collection(DbCollections.Users).doc(user).valueChanges();
  }
  
}
