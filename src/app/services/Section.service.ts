import { Section } from '../models/section.model';

export class SectionService{
  private sections: Section [] = [
    new Section('Marketting'),
    new Section('Accounting'),
    new Section ('Football'),
    new Section ('Engineering'),
  ];

  getSection(){
    return this.sections.slice();
  }
}
