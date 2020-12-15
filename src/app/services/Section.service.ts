import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/firestore';
import { Observable, Subject } from 'rxjs';
import * as firebase from 'firebase/app';
import { DbCollections } from '../services/entities.service';

export interface Section{
  id: string,
    name: string,
    dateCreated: string,
    default:Boolean
}

@Injectable({
  providedIn: 'root'
})

export class SectionService {

  private sectionCollection: AngularFirestoreCollection<Section>;
  private subSectionCollection: AngularFirestoreCollection<Section>;
  private sections:Observable<Section[]>;
  private subSections:Observable<Section[]>;
  toggleMenu = new Subject<boolean>();
  toggleChatAndAprovals = new Subject<boolean>();
  toggleChat = new Subject<boolean>();
  toggleMenuBar = new Subject<boolean>();
  ToggleCloseMenu= new Subject<boolean>();
  constructor(private afs:AngularFirestore) {
      this.sectionCollection = afs.collection<Section>('Sections',ref=> ref.orderBy('name'));
      this.sections = this.sectionCollection.valueChanges();
  }

  async getGeneralSection(entityId){
    let general:any={};
    await firebase.firestore().collection("Entities").doc(entityId).collection("Sections").where("name","==","general").get().then(a=>{general = a.docs[0].data();console.log("from service general", general.name)});
    
    return general;
  }

    //create section
   async newSection(sectionName,entity){
      let id = this.afs.createId();
      await this.afs.collection("Entities").doc(entity).collection("Sections").doc(id).set({id:id,name:sectionName,dateCreated:new Date().toLocaleDateString(),default:false});
    }

    //remove section
    async removeSection(sectionId,entity){
      // delete section content
      await firebase.firestore().collection("Entities").doc(entity).collection("Archives").where("sectionId","==",sectionId).get().then(a=>{a.docs.forEach(doc=>{
          this.afs.collection("Entities").doc(entity).collection("Archives").doc(doc.data().id).delete();
      })});

      // delete section
      await this.afs.collection("Entities").doc(entity).collection("Sections").doc(sectionId).delete().catch(err=>{console.log(err)});
      
    }

    //update section
    updateSection(sectionId,newName,entity){
     console.log("section id",sectionId);
     console.log("entity id ", entity);
       this.afs.collection("Entities").doc(entity).collection('Sections').doc(sectionId).update({
        name:newName
      });
    }

    //read sections
    getSections(entity){
      return this.afs.collection("Entities").doc(entity).collection<Section>('Sections').valueChanges();
    }

    getSectionByAccess(accessList,entity){
        this.subSectionCollection = this.afs.collection("Entities").doc(entity).collection<Section>('Sections',ref=> ref.where("id","in",accessList));
        this.subSections = this.subSectionCollection.valueChanges();
        return this.subSections;
    }

    async getSectionName(id,entity){ 
      let section = await firebase.firestore().collection(DbCollections.Entities).doc(entity).collection(DbCollections.Sections).doc(id).get();
       return section.data().name;
    }


    // toggle Menu button
    onToggleMenu(state: boolean){
      this.toggleMenu.next(state);
    }

    onToggleMenuBar(state: boolean){
      this.toggleMenuBar.next(state);
    }
    onToggleApprovals(state: boolean){
      this.toggleChatAndAprovals.next(state);
    }
    onToggleChats(state: boolean){
      this.toggleChat.next(state);
    }
    onToggleCloseMenu(state: boolean){
      this.ToggleCloseMenu.next(state);
    }
}
