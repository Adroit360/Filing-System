import { Component, ElementRef, OnInit, Output, ViewChild } from '@angular/core';
import {ActivatedRoute, Params, Router} from '@angular/router'

import { Section } from '../models/section.model';
import { SectionService } from '../services/Section.service';
@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss']
})
export class MenuComponent implements OnInit {

@ViewChild ('newSection') nameInputRef: ElementRef;
@ViewChild ('rename') Rename: ElementRef;
@Output() message: string;
  visible = true; // ng template
  Opened = false;
  delete: boolean;
  modalState: boolean;
  sections: Section [];
  section: Section;


  hooks = [];
  nameSections = [];


  constructor(private sectionService: SectionService, private router: Router, private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.sections = this.sectionService.getSection();
    this.hooks = this.sections.map(i=>true);
    this.nameSections = this.sections.map(i=>"");
    console.log(this.hooks);
  }

  toggle(){
    this.visible = !this.visible;
  }



  onSelected(item){
    this.sectionService.displaysection(item);
  }

  onAddedItem(){
    const newSection = new Section(this.nameInputRef.nativeElement.value);
    this.sections.push(newSection);
    this.visible = !this.visible;
  }

  onDeleteSection(item: Section){
    this.modalState= true;
    this.section=item;
    this.message='Are you sure you want to delete Section?'

  }

  onModalResult(result:boolean){
    if(result){
      this.sectionService.onDeleteSection(this.section)
      this.sections = this.sectionService.getSection();
      this.modalState=false;
    }
    else{
      this.modalState = false;
    }
  }

  onRenameSection(item,index){
    this.nameSections[index] = item.name;

    for (let i = 0; i < this.hooks.length; i++) {
      if(i == index){
        this.hooks[i]= false;
      }else{
        this.hooks[i]=true;
      }

    }
    this.hooks[index] = false;

  }

  onUpdate(index){
    const rename= new Section(this.Rename.nativeElement.value);
    this.sectionService.UpdateSection(rename,index);
    this.sections = this.sectionService.getSection();
    this.hooks[index]=true;
    //console.log(rename, index);
  }
  // onToggleSidebar() {
  //   this.Opened = !this.Opened;
  // }
  // onClose(){
  //   this.Opened = !this.Opened;
  // }
}
