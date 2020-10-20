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
    deletionPrivilege:false
  }

  constructor() { }

  setSelectedUser(passedData:User){
    this.user = passedData;
  }

  getSelectedUser(){
    return this.user;
  }

}
