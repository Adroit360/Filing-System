// ############################################################################
//  This file contains volatile data during execution. Volatile data consists of runtime information about
//   user, sections, and other software objects of the system.
//  ###########################################################################

import { Injectable } from '@angular/core';
import { BehaviorSubject, Subject } from 'rxjs';
import {User } from '../models/model';

@Injectable({
  providedIn: 'root'
})
export class DataService {
  searchItem= new Subject<any>();
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
  //searching a document
  search(results){
    this.searchItem.next(results);
  }
  // setting current user info
  setActiveUser(passedData:User){
    this.user = passedData;
  }

  // returns all info about current user
  getActiveUser(){
    return this.user;
  }

  // returns access control list of a user
  getAccessList(){
    return this.user.accessList;
  }

  // Set the current section the user is navigating
  setCurrentSection(sectionId,sectionName){
    this.currentSection = sectionId;
   this.currentDirectory = "";
  }

  // returns the section the user is currently navigating
  getCurrentSection(){
    return this.currentSection;

  }

  // set the current directory of the user
  setCurrentDirectory(directoryId,directoryName){

    this.currentDirectory = directoryId;

    console.log(this.directoryHierachy,"directory hiererachy");
  }

  // returns the current directory of the user
  getCurrentDirectory(){
    return this.currentDirectory;
  }

  // returns the navigation path of the user
  getDirectoryHierrachy(){
    return this.currentDirectory;
  }

  // select a user to manage access
  accessSetting:string;
  selectUserForAccessSetting(user){
      this.accessSetting = user;
  }

  // returns the user selected for access management
  getUserToSetAccess(){
    return this.accessSetting;
  }

  // set current approval document to be replied to
  approvDoc:any;
  setApproveDoc(doc:any){
    this.approvDoc = doc;
  }

  // get current approval document to be replied to
  getApproveDoc(doc:any){
    return this.approvDoc;
  }

}
