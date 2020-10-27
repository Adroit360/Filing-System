import { Injectable } from '@angular/core';
// import { MessengerService } from './messenger.service';
// import { DataService } from './data.service';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/firestore';
import { AngularFireStorage } from '@angular/fire/storage';
import { Observable } from 'rxjs';
import {finalize} from 'rxjs/operators';

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

  constructor(private afs:AngularFirestore,private afStorage:AngularFireStorage) {
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

  newArchive:Archives={
    id:"",
    sectionId:"",
    parentId:"",
    name:"",
    itemType:"",
    contentType:"",
    url:"",
    lastUploadUser:"",
    lastUpdated:"",
    owner:"",
    lock:false,
    dateCreated:""
  }
  createDirectory(directoryName,sectionId,parentId,user){
    this.newArchive.id=this.afs.createId();
    this.newArchive.name = directoryName;
    this.newArchive.parentId=parentId;
    this.newArchive.sectionId=sectionId;
    this.newArchive.owner =user;
    this.newArchive.dateCreated = new Date().toLocaleDateString();
    this.newArchive.itemType = "folder";

    this.archivesCollection.doc(this.newArchive.id).set(this.newArchive);

  }

  // upload file
  private basePath="uploads/archives"
  uploadFile(fileItem,userId,sectionId,directoryId): Observable<number> {
    let file:Archives;
    const id = this.afs.createId(); 
    const filePath = `${this.basePath}/${id}`;
    const storageRef = this.afStorage.ref(filePath);
    const uploadTask = this.afStorage.upload(filePath, fileItem);
 
    uploadTask.snapshotChanges().pipe(
      finalize(() => {
        storageRef.getDownloadURL().subscribe(downloadURL => {
          console.log('File available at', downloadURL);
          file ={
            id:id,
            name:fileItem.name,
            itemType:'file',
            contentType:fileItem.type,
            lastUploadUser:userId,
            lastUpdated:new Date().toLocaleDateString(),
            url:downloadURL,
            parentId:directoryId,
            sectionId:sectionId,
            owner:userId,
            lock:false,
            dateCreated:new Date().toLocaleDateString()
          }
          this.archivesCollection.doc(id).set(file).catch(e=>{console.log(e); return e;});
          
        });
      })
    ).subscribe();
 
    return uploadTask.percentageChanges();
  }
 
}
