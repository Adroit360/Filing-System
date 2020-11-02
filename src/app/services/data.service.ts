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
    sharedResources:[],
    isAdmin:false
  }

  currentSection:string="";
  currentDirectory:string="";
  directoryHierachy:string="";

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

  setCurrentSection(sectionId,sectionName){
    this.currentSection = sectionId;
   this.currentDirectory = "";
  }

  getCurrentSection(){
    return this.currentSection;

  }

  setCurrentDirectory(directoryId,directoryName){
    
    this.currentDirectory = directoryId;
    
    console.log(this.directoryHierachy,"directory hiererachy");
  }

  getCurrentDirectory(){
    return this.currentDirectory;
  }

  getDirectoryHierrachy(){
    return this.currentDirectory;
  }

}
