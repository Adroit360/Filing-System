import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import {User } from '../models/model';

@Injectable({
  providedIn: 'root'
})
export class DataService {

  user:User={
    firstName:"",
    lastName:"",
    role:"",
    email:"",
    accessList:[],
    creationdeletionPrivilege:false,
    isAdmin:false
  }

  constructor() { }

  setActiveUser(passedData:User){
    this.user = passedData;
  }

  getActiveUser(){
    return this.user;
  }

  // get access list of user
  getAccessList(){
    return this.user.accessList;
  }

}
