import { Injectable } from '@angular/core';
// import { MessengerService } from './messenger.service';
// import { DataService } from './data.service';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import * as firebase from 'firebase/app';

export interface Archives{
  id:string,
  sectionId:string,
  parentId:string,
  name:string,
  itemType:string,
  contentType:string,
  url:string,
  lastUploadUser:string,
  lastUpdated:string,
  owner:string,
  lock:Boolean,
  dateCreated:string
}

@Injectable({
  providedIn: 'root'
})
export class DirectoryService {

  items:any=[];
  generalContent:any=[];
  currentSection:string;
  currentDirectory:string;

  private archivesCollection: AngularFirestoreCollection<Archives>;
  private subarchivesCollection: AngularFirestoreCollection<Archives>;
  private archives:Observable<Archives[]>;
  private subarchives:Observable<Archives[]>;

  constructor(private afs:AngularFirestore) {
      this.archivesCollection = afs.collection<Archives>('Archives',ref=> ref.orderBy('date'));
      this.archives = this.archivesCollection.valueChanges();
  }

  // async setActiveSectionItems(sectionId,directoryId,accessList){
  //   this.items = await this.msg.getDirectoryContent(sectionId,directoryId,accessList);
  //   console.log('items under section',this.items);
  // }

  // getActiveDirectoryItems(){
  //   return this.items;
  // }

  // async getGeneralContent(){
  //   this.items = await this.msg.getGeneralcontent();
  //   console.log("general content",this.items);
  //   return this.items;
  // }

  // setCurrentSection(section){
  //   this.currentSection = section;
  // }

  // getCurrentSection(){return this.currentSection}

  // setCurrentDirectory(directory){
  //   this.currentDirectory = directory;
  // }

  // getCurrentDirectory(){return this.currentDirectory;}

  getSubDirectoryContent(sectionId,directoryId){
    this.subarchivesCollection = this.afs.collection<Archives>('Archives',ref=> ref.where('sectionId','==',sectionId).where('parentId','==',directoryId));
    this.subarchives = this.subarchivesCollection.valueChanges();
    // firebase.firestore().collection("Archives").where('sectionId','==',sectionId).where('parentId','==',directoryId).orderBy('dat
    console.log('from dir service', this.subarchives);
    return this.subarchives;
  }
}
