import { Subject } from 'rxjs';
import { Section } from '../models/section.model';

export class SectionService{
  private sections: Section [] = [
    new Section('Marketting'),
    new Section('Accounting'),
    new Section ('Football'),
    new Section ('Engineering'),
  ];

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
