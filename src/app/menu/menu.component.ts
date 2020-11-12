import { Component, ElementRef, OnInit, Output, ViewChild } from '@angular/core';
import {ActivatedRoute, Params, Router} from '@angular/router'
import { Section } from '../models/model';
import { SectionService } from '../services/section.service';
import { DataService } from '../services/data.service';
import {MessengerService} from '../services/messenger.service';
import { DirectoryService } from '../services/directory.service';
import { Observable } from 'rxjs';
import {AuthServiceService} from '../services/auth-service.service';

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
  ResetModal=false;
  sections: Section[];
  accessList:any;
  user:any;
  delete: boolean;
  modalState: boolean;
  section: Section;
  generalSection:any;

  hooks = [];
  nameSections = [];

  constructor(private authManager:AuthServiceService,private directory:DirectoryService, private sectionService:SectionService, private router: Router, private route: ActivatedRoute,private msg:MessengerService, private data:DataService) {


  }

   ngOnInit(): void {
    // this.sections = this.sectionService.getSection();
    this.getGeneralSection();
    this.user= this.data.getActiveUser();
    console.log("from menu comp",this.data.getAccessList());
    this.accessList = this.data.getAccessList();
    // this.sections=this.msg.getSectionByAccess(this.userInfo.getAccessList());//.then(result=>{this.sections=result; console.log(this.sections);});

    if (this.user.isAdmin){
      console.log("this is admin");
      this.sectionService.getSections().subscribe(_sections=>{
        this.sections = _sections
        this.hooks = _sections.map(i=>true);
      });
    }else{
      console.log("this is not admin");
      this.sectionService.getSectionByAccess(this.accessList).subscribe(_sections=>{
        this.sections = _sections
        this.hooks = _sections.map(i=>true);
      });
    }
    console.log("sections",this.sections);
  }

  async getGeneralSection(){
    this.generalSection = await this.sectionService.getGeneralSection();
    console.log("general section info",this.generalSection.id);
  }
  toggle(){
    this.visible = !this.visible;
  }


  async onSelected(sectionId,sectionName, event){

    if(event.target.localName=="span"){
      console.log(event.target.localName);
      event.stopPropagation();
    }

    this.data.setCurrentSection(sectionId,sectionName);
    this.data.setCurrentDirectory(sectionId,sectionName);
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

  currentSection:string;
  onDeleteSection(item){
    this.modalState= true;
    this.currentSection=item;
    this.message='Are you sure you want to delete Section?'

  }

  onModalResult(result:boolean){
    if(result){
      // this.sectionService.onDeleteSection(this.section)
      // this.sections = this.sectionService.getSection();
      console.log("section to be deleted",this.currentSection);
      this.sectionService.removeSection(this.currentSection);
      this.modalState=false;
    }
    else{
      this.modalState = false;
    }
  }

  onRenameSection(item,index){
    this.nameSections[index] = item.name;
    this.currentSection = item.id;
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
    this.sectionService.updateSection(this.currentSection,this.Rename.nativeElement.value);
    this.hooks[index]=true;
    console.log(this.Rename.nativeElement.value, index);
  }
  // onToggleSidebar() {
  //   this.Opened = !this.Opened;
  // }
  // onClose(){
  //   this.Opened = !this.Opened;
  // }

  onReset(value: boolean){
    this.ResetModal=value;
  }

  reset(){
    this.authManager.ResetPassword(this.user.email);
    this.ResetModal=!this.ResetModal;
  }

  tooltip(event){
    event.stopPropagation();
  }

  }


