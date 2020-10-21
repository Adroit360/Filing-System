import { Subject } from 'rxjs';
import { Section } from '../models/section.model';

export class SectionService{


  // contains an array of departments created by the admin
  private sections: Section [] = [
    new Section('Marketting'),
    new Section('Accounting'),
    new Section ('Football'),
    new Section ('Engineering'),
  ];

 // holds the folders of the various departments
  departments = ['Marketting', 'Accounting', 'Finance', 'Football', 'Cleaning',
  'Marketting', 'Accounting', 'Finance', 'Football', 'Cleaning',
  'Marketting', 'Accounting', 'Finance', 'Football', 'Cleaning',
  'Marketting', 'Accounting', 'Finance', 'Football', 'Cleaning',
  
  'Marketting', 'Accounting', 'Finance', 'Football', 'Cleaning',
  'Marketting', 'Accounting', 'Finance', 'Football', 'Cleaning',
  'Marketting', 'Accounting', 'Finance', 'Football', 'Cleaning',
  'Marketting', 'Accounting', 'Finance', 'Football', 'Cleaning',

  'Marketting', 'Accounting', 'Finance', 'Football', 'Cleaning',
  'Marketting', 'Accounting', 'Finance', 'Football', 'Cleaning',
  'Marketting', 'Accounting', 'Finance', 'Football', 'Cleaning',
  'Marketting', 'Accounting', 'Finance', 'Football', 'Cleaning',

];


  department_files = ['invoice.pdf', 'invoice.doc', 'invoice.txt', 'invoice.jpeg', 'invoice.png',]; // contains the folders and files for each department

  sectionName = new Subject<string>();


  getSection(){
    return this.sections.slice();
  }

//displaying a section by name
  displaysection(value:Section){
  this.sectionName.next(value.name);

  }

  //update section
  updateSection(item:Section, index){
    if (index !=-1){
      this.sections[index]= item
    }
  }

  //Deleting a  section
  onDeleteSection(section: Section) {
    //throw new Error('Method not implemented.');
    let index = this.sections.indexOf(section);
    if (index != -1) {
      this.sections.splice(index, 1);
    }
  }

  //Renaming and updating a section
  UpdateSection(rename: Section, index: any) {
    //throw new Error('Method not implemented.');
    if(index!=-1){
      this.sections[index]=rename;

    }
  }

}
