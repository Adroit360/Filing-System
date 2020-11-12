// ############################################################################
//  This file contains volatile data during execution. Volatile data consists of runtime information about
//   user, sections, and other software objects of the system.
//  ###########################################################################

import { Injectable } from '@angular/core';
import { BehaviorSubject, Subject } from 'rxjs';
import { User } from '../models/model';
import { DirectoryService } from './directory.service';

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
  currentDirectoryName:string="";
  directoryHierachy:string="";
  accessibleDocs:any =[];

  constructor(private directoryManager: DirectoryService) { }

  search(searchParam:string){
    this.searchItem.next(searchParam);
  }

  // setting current user info
  async setActiveUser(passedData:User){
    this.user = await passedData;
    this.directoryManager.getAccessibleArchives(this.user.accessList).subscribe(result=>{
      this.accessibleDocs = result;
    });
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
    this.currentDirectoryName= directoryName;

    console.log(this.currentDirectoryName,"directory name set");
  }

  // returns the current directory of the user by id
  getCurrentDirectory(){
    return this.currentDirectory;
  }

   // returns the current directory of the user by name
   getCurrentDirectoryName(){
    return this.currentDirectoryName;
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

  getAccessibleDocumentsByUser(user){

  }

}
