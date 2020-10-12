import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { Section } from './section.model';
@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss']
})
export class MenuComponent implements OnInit {
sections: Section [] = [
  new Section('Marketting'),
  new Section( 'Accounting'),
  new Section ('Football'),
  new Section ('Engineering'),
];

@ViewChild ('newSection') nameInputRef: ElementRef;

visible = true;


  constructor() { }

  ngOnInit(): void {
  }

  toggle(){
    this.visible=!this.visible;
  }

  onAddedItem(){
    const newSection= new Section(this.nameInputRef.nativeElement.value);
   this.sections.push(newSection);
   this.visible=!this.visible;
  }

  onClick(){
  console.log("Clicked!");}

}
