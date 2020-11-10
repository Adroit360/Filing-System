import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import * as firebase from 'firebase/app';

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

  constructor(private afs:AngularFirestore) {
      this.sectionCollection = afs.collection<Section>('Sections',ref=> ref.orderBy('name'));
      this.sections = this.sectionCollection.valueChanges();
  }

  async getGeneralSection(){
    let general:any;
    await firebase.firestore().collection("Sections").where("name","==","general").get().then(a=>{general = a.docs[0].data();console.log("from service general", general.name)});
    
    return general;
  }
    //create section
   async newSection(sectionName){
      let id = this.afs.createId();
      await this.sectionCollection.doc(id).set({id:id,name:sectionName,dateCreated:new Date().toLocaleDateString(),default:false});
    }

    //remove section
    async removeSection(sectionId){
      // delete section content
      await firebase.firestore().collection("Sections").where("parentId","==",sectionId).get().then(a=>{a.docs.forEach(doc=>{
          this.sectionCollection.doc(doc.data().id).delete();
      })});

      // delete section
      await this.sectionCollection.doc(sectionId).delete().catch(err=>{console.log(err)});
      
    }

    //update section
   async updateSection(sectionId,newName){
      await this.sectionCollection.doc(sectionId).update({
        name:newName
      });
    }

    //read sections
    getSections(){
      return this.sections;
    }

    getSectionByAccess(accessList){
    //   let access_sections=[];
    //   // let accessList = await this.getUserAccessList(userId);
    //    firebase.firestore().collection('Sections').get().then(a=>{a.docs.forEach(doc=>{
    //     if (accessList.includes(doc.id) ){
    //       access_sections.push({id:doc.data().id,name:doc.data().name});
    //     }
       
    //   });
    //   console.log("accessed sections",access_sections);
    // });
      
    //   return access_sections;
        this.subSectionCollection = this.afs.collection<Section>('Sections',ref=> ref.where("id","in",accessList));
        this.subSections = this.subSectionCollection.valueChanges();
        return this.subSections;
    }

}
