import { Injectable } from '@angular/core';
// import { MessengerService } from './messenger.service';
// import { DataService } from './data.service';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/firestore';
import { AngularFireStorage } from '@angular/fire/storage';
import { Observable, of } from 'rxjs';
import {finalize} from 'rxjs/operators';
import * as firebase from 'firebase/app';
import { DbCollections } from '../services/entities.service';

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
  public:Boolean,
  alias:string,
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
      this.archivesCollection = afs.collection<Archives>('Archives',ref=> ref.orderBy('dateCreated'));
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

  getSubDirectoryContent(sectionId,directoryId,entity){
    this.subarchivesCollection = this.afs.collection("Entities").doc(entity).collection<Archives>('Archives',ref=> ref.where('sectionId','==',sectionId).where('parentId','==',directoryId));
    this.subarchives = this.subarchivesCollection.valueChanges();
    // firebase.firestore().collection("Archives").where('sectionId','==',sectionId).where('parentId','==',directoryId).orderBy('dat
    console.log('from dir service', this.subarchives);
    return this.subarchives;
  }

  
  _getSubDirectoryContent(directoryId,entity){
    this.subarchivesCollection = this.afs.collection("Entities").doc(entity).collection<Archives>('Archives',ref=> ref.where('parentId','==',directoryId));
    this.subarchives = this.subarchivesCollection.valueChanges();
    // firebase.firestore().collection("Archives").where('sectionId','==',sectionId).where('parentId','==',directoryId).orderBy('dat
    // console.log('from dir service', this.subarchives);
    return this.subarchives;
  }
 
  async getParent(id,entity){
    let parent="";
    let parentObj={id:"",name:""};
    await firebase.firestore().collection("Entities").doc(entity).collection("Archives").doc(id).get().then(result=>{parent = result.data().parentId;console.log("parent from service",parent)});
    
   if (parent){
       await firebase.firestore().collection("Entities").doc(entity).collection("Archives").doc(parent).get()
       .then(result=>{parentObj.id=result.data().id; parentObj.name=result.data().name;console.log("parent from service",parentObj)})
       .catch(async err=>{
        await firebase.firestore().collection("Entities").doc(entity).collection("Sections").doc(parent).get()
        .then(result=>{parentObj.id=result.data().id; parentObj.name=result.data().name;console.log("parent from service",parentObj)})
       });
    }

    console.log("this is the parent object from service", parentObj);
    return parentObj;
  }

  getFileList(listItems:[],entity){
    // console.log("listitems in getfilelist ", listItems);
    this.subarchivesCollection = this.afs.collection("Entities").doc(entity).collection<Archives>('Archives',ref=> ref.where('id','in',listItems));
    this.subarchives = this.subarchivesCollection.valueChanges();
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
    alias:"",
    public:true,
    dateCreated:""
  }


  createDirectory(directoryName,sectionId,parentId,user,directoryLevel:Boolean,entity){
    let similars:any;
    firebase.firestore().collection("Entities").doc(entity).collection("Archives").where("parentId","==",parentId).where("name","==",directoryName).get().then(result=>{
      if (result.docs.length>0){
        this.newArchive.alias = directoryName+" "+result.docs.length;
      }else{
        this.newArchive.alias = directoryName;
      }

      this.newArchive.id=this.afs.createId();
      this.newArchive.name = directoryName;
      this.newArchive.parentId=parentId;
      this.newArchive.sectionId=sectionId;
      this.newArchive.owner =user;
      this.newArchive.dateCreated = new Date().toLocaleDateString();
      this.newArchive.itemType = "folder";
      this.newArchive.public = directoryLevel;

      this.afs.collection("Entities").doc(entity).collection("Archives").doc(this.newArchive.id).set(this.newArchive);
    });
   
    
  }

  // upload file
   private  basePath="uploads/entities"
   async uploadFile(fileItem,userId,sectionId,directoryId,entity)//: Observable<number> 
    {
    let file:Archives;
    let alias="";
    firebase.firestore().collection("Entities").doc(entity).collection("Archives").where("parentId","==",directoryId).where("name","==",fileItem.name).get().then(result=>{
      if (result.docs.length>0){
        alias = fileItem.name+" "+result.docs.length;
      }else{
        alias = fileItem.name;
      }

    this.afs.collection("Entities").doc(entity).collection("Archives").doc(directoryId).get().subscribe(result=>{
      const id = this.afs.createId(); 
      const filePath = `${this.basePath}/${entity}/${alias}`;
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
              alias:alias,
              public:result.data().public,
              dateCreated:new Date().toLocaleDateString()
            }
            this.afs.collection("Entities").doc(entity).collection<Archives>('Archives').doc(id).set(file).catch(e=>{console.log(e); return e;});
            
          });
        })
      ).subscribe();
   
      // return uploadTask.percentageChanges();
    });
  }
  );
    
  }

  async deleteFile(fileId,alias,entity){
    const filePath = `${this.basePath}/${entity}`;
    const storageRef = this.afStorage.ref(filePath).child(alias);
    await storageRef.delete();
    await this.afs.collection("Entities").doc(entity).collection<Archives>('Archives').doc(fileId).delete();
  }

 deleteDirectory(directoryId,entity){
   firebase.firestore().collection("Entities").doc(entity).collection("Archives").where('parentId','==',directoryId)
    .get().then(a=>{a.docs.forEach(doc=>{
        if(doc.data().itemType == "folder"){this.deleteDirectory(doc.data().id,doc.data().entity);}
        else{ this.deleteFile(doc.data().id,doc.data().alias,entity);}
    })});
    
    this.afs.collection("Entities").doc(entity).collection<Archives>('Archives').doc(directoryId).delete().catch(e=>{console.log(e)});
  }

  getAccessibleArchives(accessList,entity){
    return this.afs.collection("Entities").doc(entity).collection<Archives>('Archives',ref=> ref.where('sectionId','in',accessList)).valueChanges();
  }

  //  set recently accessed folders
  private arrayUnion = firebase.firestore.FieldValue.arrayUnion;
  private arrayRemove = firebase.firestore.FieldValue.arrayRemove;
  recentFolders(user,directory,entity){
    this.afs.collection(DbCollections.Entities).doc(entity).collection(DbCollections.Users).doc(user).update({recentFolders: this.arrayUnion(directory)})
  }

  // get recent folders
  getRecentFolders(user,entity){
    return  this.afs.collection(DbCollections.Entities).doc(entity).collection(DbCollections.Users).doc(user).valueChanges();
  }

  getDirectoryName(id,entity){
    this.afs.collection(DbCollections.Entities).doc(entity).collection(DbCollections.Archives).doc(id).get().subscribe(result=>{
      return result.data().alias;
    })
  }

}
