import { Component, ElementRef, OnInit, Output, ViewChild } from '@angular/core';
import {ActivatedRoute, Params, Router} from '@angular/router'
import { Section } from '../models/model';
import { SectionService } from '../services/section.service';
import { DataService } from '../services/data.service';
import {MessengerService} from '../services/messenger.service';
import { DirectoryService } from '../services/directory.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss']
})
export class MenuComponent implements OnInit {

@ViewChild ('newSection') nameInputRef: ElementRef;
@ViewChild ('rename') Rename: ElementRef;
@Output() message: string;
// @Output() sectionClicked = new EventEmitter<any>();

  visible = true; // ng template
  Opened = false;

  sections: Section[];
  accessList:any;
  user:any;
  delete: boolean;
  modalState: boolean;
  section: Section;


  hooks = [];
  nameSections = [];

  constructor(private directory:DirectoryService, private sectionService:SectionService, private router: Router, private route: ActivatedRoute,private msg:MessengerService, private data:DataService) {
   
  }

   ngOnInit(): void {
    // this.sections = this.sectionService.getSection();
    
    this.user= this.data.getActiveUser();
    console.log("from menu comp",this.data.getAccessList());
    this.accessList = this.data.getAccessList();
    // this.sections=this.msg.getSectionByAccess(this.userInfo.getAccessList());//.then(result=>{this.sections=result; console.log(this.sections);});
    

    this.sectionService.getSections().subscribe(_sections=>{
      this.sections = _sections
      this.hooks = _sections.map(i=>true);
    });
    
    console.log("sections",this.sections);
  }


  toggle(){
    this.visible = !this.visible;
  }

  async onSelected(sectionId,sectionName){
   
    this.data.setCurrentSection(sectionId,sectionName);
    console.log(sectionName);
    // await this.directory.setActiveSectionItems(id,id,this.accessList);
    
  }

  async onSelectedGeneral(sectionId,sectionName){ 
    this.data.setCurrentSection(sectionId,sectionName);
    this.data.setCurrentDirectory(sectionId,sectionName);
    console.log(sectionName);
    // await this.directory.setActiveSectionItems(id,id,this.accessList);
  }

  onAddedItem(){
    this.sectionService.newSection(this.nameInputRef.nativeElement.value);
    this.visible = !this.visible;

  }

  onDeleteSection(item: Section){
    this.modalState= true;
    this.section=item;
    this.message='Are you sure you want to delete Section?'

  }

  onModalResult(result:boolean){
    if(result){
      // this.sectionService.onDeleteSection(this.section)
      // this.sections = this.sectionService.getSection();
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
    // const rename= new Section(this.Rename.nativeElement.value);
    // this.sectionService.UpdateSection(rename,index);
    // this.sections = this.sectionService.getSection();
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
