// ############################################################################
//  This file contains volatile data during execution. Volatile data consists of runtime information about
//   user, sections, and other software objects of the system.
//  ###########################################################################

import { Injectable } from '@angular/core';
import { BehaviorSubject, Subject } from 'rxjs';
import { User,SystemUser } from '../app/models/model';
import { DirectoryService } from './directory.service';
import { EntitiesService } from './entities.service';

@Injectable({
  providedIn: 'root'
})
export class DataService {
  searchItem= new Subject<any>();
  user:any;
  systemUser:any;

  currentSection:string="";
  currentDirectory:string="";
  currentDirectoryName:string="";
  directoryHierachy:string="";
  accessibleDocs:any =[];
  subscriptionPackage:any;

  // subscription related data
  validity_days:number;
  subscriptionDate:string="";
  expiringDate:string="";
  subscriptionPlan:string="";
  MS_PER_DAY = 1000 * 60 * 60 * 24;
  is_trial:boolean;
  subscriptionId:string;

  konvySubscriptionPackage:any;


  constructor(private directoryManager: DirectoryService,private entityManager:EntitiesService) { }

  search(searchParam:string){
    this.searchItem.next(searchParam);
  }



  // setting current user info
  async setActiveUser(userInfo){
    this.systemUser =  userInfo;
    console.log("this is the user info from volatile data",userInfo);
    this.setEntity(userInfo.entity);
    this.user = userInfo;
    // this.user = await this.entityManager.getEntityUser(userInfo.email,userInfo.entity);
    // this.directoryManager.getAccessibleArchives(userInfo.user.accessList,userInfo.entity).subscribe(result=>{
    //   this.accessibleDocs = result;
    // });

  }

  // this function is used to set the active user after login
  async _setActiveUser(userInfo){
    this.systemUser =  userInfo;
    console.log("this is the user info from volatile data",userInfo);
    this.setEntity(userInfo.entity);
    this.user = await this.entityManager.getEntityUser(userInfo.email,userInfo.entity);
    localStorage.setItem("user", JSON.stringify({...this.user,entity:userInfo.entity}));

    // this.directoryManager.getAccessibleArchives(userInfo.user.accessList,userInfo.entity).subscribe(result=>{
    //   this.accessibleDocs = result;
    // });

    return this.entityManager.getEntity(this.systemUser.entity);
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

  // set entity name
  entityName:string;
  entityId: string;
  setEntity( entityId:string){
    this.entityId = entityId;
    // this.entityName = entityName;
  }

  getEntity(){
    return this.entityId;
  }

    //Edit user
    EditUser = new BehaviorSubject<any>({});
    setEditUSerInfo(item:User){
      this.EditUser.next({details: item});
    }

    numberOfRecentFolders:number=0;
    firstRecentFolder:any;
    setCurrentRecentFolderLength(value:number){
      this.numberOfRecentFolders=value;
      console.log("number of recent fold",this.numberOfRecentFolders);
    }

    getCurrentRecentFolderLength(){
      return this.numberOfRecentFolders;
    }

    setFirstRecentFolder(folder:any){
      this.firstRecentFolder = folder;
      console.log("first folder",this.firstRecentFolder);
    }

    getFirstRecentFolder(){
      return this.firstRecentFolder;
    }


    // chatbox listener
    chatBox_is_open:boolean=false;
    // set chatbox to open
    set_Chatbox_to_open(){
      this.chatBox_is_open=true;
      console.log("chat box is open");
    }

    // set chatbox to close
    set_Chatbox_to_close(){
      this.chatBox_is_open=false;
      console.log("chat box is closed");
    }

    is_chatArea:boolean = false;
    set_is_chatArea_to_in(){
      this.is_chatArea=true;
      console.log("chat area is open");
    }

    set_is_chatArea_to_out(){
      this.is_chatArea=false;
      console.log("chat area is closed");
    }

    setSubscriptionInfo(obj){
      let subscriptionPackage=obj;
      console.log(subscriptionPackage,"this is subscription group");
      this.subscriptionDate = new Date(subscriptionPackage.subscriptionDate.toDate()).toDateString();
      console.log("first worked");
      this.validity_days = (new Date(subscriptionPackage.expiringDate).getTime()- new Date(subscriptionPackage.subscriptionDate.toDate()).getTime())/this.MS_PER_DAY;
      this.expiringDate = subscriptionPackage.expiringDate;
      this.subscriptionPlan=subscriptionPackage.subscriptionType;
      this.is_trial = obj.trial;
      this.subscriptionId = obj.id;
    }

    getSubscriptionPackage(){
      return this.subscriptionPackage;
    }

    getSubscriptionInfo(){
      return {trial:this.is_trial,validity_days:this.validity_days,subscriptionType:this.subscriptionPlan,expiringDate:this.expiringDate,
        subscriptionDate:this.subscriptionDate, subscriptionId:this.subscriptionId }
    }

    setKonvySubscriptionPackageInfo(subscriptionInfo){
      this.konvySubscriptionPackage = subscriptionInfo
    }

    getKonvySubscriptionPackageInfo(){
      return this.konvySubscriptionPackage;
    }

}
