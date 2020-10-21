import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/firestore';
import { Observable } from 'rxjs';




export interface Section{
  id: string,
    name: string,
    dateCreated: string
}




@Injectable({
  providedIn: 'root'
})

export class SectionService {
  
  private sectionCollection: AngularFirestoreCollection<Section>;
  private sections:Observable<Section[]>;

  constructor(private afs:AngularFirestore) {
      this.sectionCollection = afs.collection<Section>('Sections',ref=> ref.orderBy('name'));
      this.sections = this.sectionCollection.valueChanges();
  }

    //create section
   async newSection(sectionName){
      let id = this.afs.createId();
      await this.sectionCollection.doc(id).set({id:id,name:sectionName,dateCreated:new Date().toLocaleDateString()});
    }

    //remove section
    async removeSection(sectionId){ 
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
  
}
