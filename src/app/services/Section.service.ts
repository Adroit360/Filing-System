import { Subject } from 'rxjs';
import { Section } from '../models/section.model';

export class SectionService{
  onDeleteSection(section: Section) {
    throw new Error('Method not implemented.');
  }
  UpdateSection(rename: Section, index: any) {
    throw new Error('Method not implemented.');
  }

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
];


//  let files = {
//     "Marketing":{
//       "one":{
//         "four":{},
//         "five":{},
//         "six":{}
//       },
//       "two":{
//         "seven":{},
//       },
//       "three":{
//       },
//     },
//     "Supply Chain":{

//     },
//     "IT":{

//     },
//     "Production":{

//     },
//     "Finance":{

//     },
//     "SharedService":{

//     },
//   }

  department_files = ['invoice.pdf', 'invoice.doc', 'invoice.txt', 'invoice.jpeg', 'invoice.png',]; // contains the folders and files for each department

  sectionName = new Subject<string>();


  getSection(){
    return this.sections.slice();
  }

  displaysection(value:Section){

  //  return value;
  this.sectionName.next(value.name);
  console.log(value.name);
  }

}
