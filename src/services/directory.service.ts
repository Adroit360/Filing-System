import { Injectable } from "@angular/core";
// import { MessengerService } from './messenger.service';
// import { DataService } from './data.service';
import {
  AngularFirestore,
  AngularFirestoreCollection,
} from "@angular/fire/firestore";
import { AngularFireStorage } from "@angular/fire/storage";
import { Observable, of, Subject } from "rxjs";
import { finalize } from "rxjs/operators";
import * as firebase from "firebase/app";
import { DbCollections } from "./entities.service";

export interface Archives {
  id: string;
  sectionId: string;
  parentId: string;
  name: string;
  itemType: string;
  contentType: string;
  url: string;
  lastUploadUser: string;
  lastUpdated: string;
  owner: string;
  public: Boolean;
  alias: string;
  dateCreated: string;
}

@Injectable({
  providedIn: "root",
})
export class DirectoryService {
  items: any = [];
  generalContent: any = [];
  currentSection: string;
  currentDirectory: string;
  progressBarValue = new Subject<number>();
  private archivesCollection: AngularFirestoreCollection<Archives>;
  private subarchivesCollection: AngularFirestoreCollection<Archives>;
  private archives: Observable<Archives[]>;
  private subarchives: Observable<Archives[]>;

  constructor(
    private afs: AngularFirestore,
    private afStorage: AngularFireStorage
  ) {
    this.archivesCollection = afs.collection<Archives>("Archives", (ref) =>
      ref.orderBy("dateCreated")
    );
    this.archives = this.archivesCollection.valueChanges();
  }
  onGetProgressBarValue(number){
    this.progressBarValue.next(number);
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

  getSubDirectoryContent(sectionId, directoryId, entity) {

    // return new Promise((resolve,reject)=>{
      this.subarchivesCollection =  this.afs
      .collection("Entities")
      .doc(entity)
      .collection<Archives>("Archives", (ref) =>
        ref
          .where("sectionId", "==", sectionId)
          .where("parentId", "==", directoryId)
      );
      this.subarchives = this.subarchivesCollection.valueChanges();

      // resolve(this.subarchives);
    // });

    // firebase.firestore().collection("Archives").where('sectionId','==',sectionId).where('parentId','==',directoryId).orderBy('dat
    // console.log("from dir service", this.subarchives);
    return this.subarchives;
  }

  _getSubDirectoryContent(directoryId, entity) {
    this.subarchivesCollection = this.afs
      .collection("Entities")
      .doc(entity)
      .collection<Archives>("Archives", (ref) =>
        ref.where("parentId", "==", directoryId)
      );
    this.subarchives = this.subarchivesCollection.valueChanges();
    // firebase.firestore().collection("Archives").where('sectionId','==',sectionId).where('parentId','==',directoryId).orderBy('dat
    // console.log('from dir service', this.subarchives);
    return this.subarchives;
  }

  async getParent(id, entity) {
    let parent = "";
    let parentObj = { id: "", name: "" };
    await firebase
      .firestore()
      .collection(DbCollections.Entities)
      .doc(entity)
      .collection(DbCollections.Archives)
      .doc(id)
      .get()
      .then((result) => {
        parent = result.data().parentId;
        console.log("parent from service", parent);
      });

    if (parent) {
      await firebase
        .firestore()
        .collection(DbCollections.Entities)
        .doc(entity)
        .collection(DbCollections.Archives)
        .doc(parent)
        .get()
        .then((result) => {
          parentObj.id = result.data().id;
          parentObj.name = result.data().name;
          console.log("parent from service", parentObj);
        })
        .catch(async (err) => {
          await firebase
            .firestore()
            .collection(DbCollections.Entities)
            .doc(entity)
            .collection(DbCollections.Sections)
            .doc(parent)
            .get()
            .then((result) => {
              parentObj.id = result.data().id;
              parentObj.name = result.data().name;
              console.log("parent from service", parentObj);
            });
        });
    }

    console.log("this is the parent object from service", parentObj);
    return parentObj;
  }

  getFileList(listItems: [], entity) {
    // console.log("listitems in getfilelist ", listItems);
    this.subarchivesCollection = this.afs
      .collection(DbCollections.Entities)
      .doc(entity)
      .collection<Archives>(DbCollections.Archives, (ref) =>
        ref.where("id", "in", listItems)
      );
    this.subarchives = this.subarchivesCollection.valueChanges();
    return this.subarchives;
  }

  newArchive: Archives = {
    id: "",
    sectionId: "",
    parentId: "",
    name: "",
    itemType: "",
    contentType: "",
    url: "",
    lastUploadUser: "",
    lastUpdated: "",
    owner: "",
    alias: "",
    public: true,
    dateCreated: "",
  };

  createDirectory(
    directoryName,
    sectionId,
    parentId,
    user,
    directoryLevel: Boolean,
    entity
  ) {
    let similars: any;
    firebase
      .firestore()
      .collection(DbCollections.Entities)
      .doc(entity)
      .collection(DbCollections.Archives)
      .where("parentId", "==", parentId)
      .where("name", "==", directoryName)
      .get()
      .then((result) => {
        if (result.docs.length > 0) {
          this.newArchive.alias = directoryName + " " + result.docs.length;
        } else {
          this.newArchive.alias = directoryName;
        }

        this.newArchive.id = this.afs.createId();
        this.newArchive.name = directoryName;
        this.newArchive.parentId = parentId;
        this.newArchive.sectionId = sectionId;
        this.newArchive.owner = user;
        this.newArchive.dateCreated = new Date().toLocaleDateString();
        this.newArchive.itemType = "folder";
        this.newArchive.public = directoryLevel;

        this.afs
          .collection(DbCollections.Entities)
          .doc(entity)
          .collection(DbCollections.Archives)
          .doc(this.newArchive.id)
          .set(this.newArchive);
      });
  }

  // upload file
  private basePath = "uploads/entities";
  async uploadFile(
    fileItem,
    userId,
    sectionId,
    directoryId,
    entity //: Observable<number>
  ) {
    let file: Archives;
    let alias = "";
    //   console.log("Datas",fileItem,userId,sectionId,directoryId,entity);
    // return;
    let archiveResult = await firebase
      .firestore()
      .collection(DbCollections.Entities)
      .doc(entity)
      .collection(DbCollections.Archives)
      .where("parentId", "==", directoryId)
      .where("name", "==", fileItem.name)
      .get();

    if (archiveResult.docs.length > 0) {
      alias = fileItem.name + " " + archiveResult.docs.length;
    } else {
      alias = fileItem.name;
    }

    let directoryResult = await this.afs
      .collection(DbCollections.Entities)
      .doc(entity)
      .collection(DbCollections.Archives)
      .doc(directoryId)
      .get()
      .toPromise();

    const id = this.afs.createId();
    const filePath = `${this.basePath}/${entity}/${alias}`;
    const storageRef = this.afStorage.ref(filePath);
    // uploading a file to firebase
    const uploadTask = this.afStorage.upload(filePath, fileItem);

    // getting the upload progress
    uploadTask.percentageChanges().subscribe(number =>{
      console.log(number);
      this.onGetProgressBarValue(number);

    });

    let uploadResult = await uploadTask.snapshotChanges().toPromise();

    let downloadURL = await storageRef.getDownloadURL().toPromise();

    console.log("File available at", downloadURL);
    file = {
      id: id,
      name: fileItem.name,
      itemType: "file",
      contentType: fileItem.type,
      lastUploadUser: userId,
      lastUpdated: new Date().toLocaleDateString(),
      url: downloadURL,
      parentId: directoryId,
      sectionId: sectionId,
      owner: userId,
      alias: alias,
      public: directoryResult.data().public,
      dateCreated: new Date().toLocaleDateString(),
    };


    return this.afs
      .collection(DbCollections.Entities)
      .doc(entity)
      .collection<Archives>(DbCollections.Archives)
      .doc(id)
      .set(file);
//upload
    // return uploadTask.percentageChanges();
  }

  async uploadFile2(
    fileItem,
    userId,
    sectionId,
    directoryId,
    entity //: Observable<number>
  ) {
    let file: Archives;
    let alias = "";
    //   console.log("Datas",fileItem,userId,sectionId,directoryId,entity);
    // return;
    let getArchiveResult = await firebase
      .firestore()
      .collection(DbCollections.Entities)
      .doc(entity)
      .collection(DbCollections.Archives)
      .where("parentId", "==", directoryId)
      .where("name", "==", fileItem.name)
      .get();

    if (getArchiveResult.docs.length > 0) {
      alias = fileItem.name + " " + getArchiveResult.docs.length;
    } else {
      alias = fileItem.name;
    }

    let getDirResult = await this.afs
      .collection(DbCollections.Entities)
      .doc(entity)
      .collection(DbCollections.Archives)
      .doc(directoryId)
      .get()
      .toPromise();

    const id = this.afs.createId();
    const filePath = `${this.basePath}/${entity}/${alias}`;
    const storageRef = this.afStorage.ref(filePath);
    const uploadTask = this.afStorage.upload(filePath, fileItem);

    let uploadTaskSnapshot = await uploadTask.snapshotChanges().toPromise();

    let downloadURL = await storageRef.getDownloadURL().toPromise();

    console.log("File available at", downloadURL);

    file = {
      id: id,
      name: fileItem.name,
      itemType: "file",
      contentType: fileItem.type,
      lastUploadUser: userId,
      lastUpdated: new Date().toLocaleDateString(),
      url: downloadURL,
      parentId: directoryId,
      sectionId: sectionId,
      owner: userId,
      alias: alias,
      public: getDirResult.data().public,
      dateCreated: new Date().toLocaleDateString(),
    };

    return await this.afs
      .collection(DbCollections.Entities)
      .doc(entity)
      .collection<Archives>(DbCollections.Archives)
      .doc(id)
      .set(file);
  }

  async deleteFile(fileId, alias, entity) {
    const filePath = `${this.basePath}/${entity}`;
    const storageRef = this.afStorage.ref(filePath).child(alias);
    await storageRef.delete();
    await this.afs
      .collection(DbCollections.Entities)
      .doc(entity)
      .collection<Archives>(DbCollections.Archives)
      .doc(fileId)
      .delete();
  }

  deleteDirectory(directoryId, entity) {
    firebase
      .firestore()
      .collection(DbCollections.Entities)
      .doc(entity)
      .collection(DbCollections.Archives)
      .where("parentId", "==", directoryId)
      .get()
      .then((a) => {
        a.docs.forEach((doc) => {
          if (doc.data().itemType == "folder") {
            this.deleteDirectory(doc.data().id, doc.data().entity);
          } else {
            this.deleteFile(doc.data().id, doc.data().alias, entity);
          }
        });
      });

    this.afs
      .collection(DbCollections.Entities)
      .doc(entity)
      .collection<Archives>(DbCollections.Archives)
      .doc(directoryId)
      .delete()
      .catch((e) => {
        console.log(e);
      });
  }

  // search document based on user access list
  getAccessibleArchives(accessList, entity) {
    return this.afs
      .collection(DbCollections.Entities)
      .doc(entity)
      .collection<Archives>(DbCollections.Archives, (ref) =>
        ref.where("sectionId", "in", accessList)
      )
      .valueChanges();
  }

  //  set recently accessed folders
  private arrayUnion = firebase.firestore.FieldValue.arrayUnion;
  private arrayRemove = firebase.firestore.FieldValue.arrayRemove;
  recentFolders(user, directory, entity, firstFolder, numberOfFolders) {
    this.afs
      .collection(DbCollections.Entities)
      .doc(entity)
      .collection(DbCollections.Users)
      .doc(user)
      .update({ recentFolders: this.arrayUnion(directory) });
    if (numberOfFolders > 7) {
      this.afs
        .collection(DbCollections.Entities)
        .doc(entity)
        .collection(DbCollections.Users)
        .doc(user)
        .update({ recentFolders: this.arrayRemove(firstFolder) });
      console.log("deteleed");
    }
  }

  // get recent folders
  getRecentFolders(user, entity) {
    return this.afs
      .collection(DbCollections.Entities)
      .doc(entity)
      .collection(DbCollections.Users)
      .doc(user)
      .valueChanges();
  }

  getDirectoryName(id, entity) {
    this.afs
      .collection(DbCollections.Entities)
      .doc(entity)
      .collection(DbCollections.Archives)
      .doc(id)
      .get()
      .subscribe((result) => {
        return result.data().alias;
      });
  }
}
