import { Component, ElementRef, OnInit, Output, ViewChild, EventEmitter } from '@angular/core';
import {ActivatedRoute, Params, Router} from '@angular/router'
import { Section } from '../models/model';
import { SectionService } from '../services/section.service';
import { DataService } from '../services/data.service';
import {MessengerService} from '../services/messenger.service';
import { DirectoryService } from '../services/directory.service';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss']
})
export class MenuComponent implements OnInit {

@ViewChild ('newSection') nameInputRef: ElementRef;
// @Output() sectionClicked = new EventEmitter<any>();

  visible = true; // ng template
  Opened = false;

  sections: any;
  accessList:any;
  user:any;

  constructor(private directory:DirectoryService, private sectionService:SectionService, private router: Router, private route: ActivatedRoute,private msg:MessengerService, private userInfo:DataService) {
   
  }

  ngOnInit(): void {
    // this.sections = this.sectionService.getSection();
    this.user= this.userInfo.getActiveUser();
    console.log("from menu comp",this.userInfo.getAccessList());
    this.accessList = this.userInfo.getAccessList();
    // this.sections=this.msg.getSectionByAccess(this.userInfo.getAccessList());//.then(result=>{this.sections=result; console.log(this.sections);});
    this.sections = this.sectionService.getSections();
    console.log("sections",this.sections);
  }


  toggle(){
    this.visible = !this.visible;
  }

  async onSelected(id){
   
  
    // await this.directory.setActiveSectionItems(id,id,this.accessList);
    
  }

  onAddedItem(){
    // let newSection:Section={id:"",name:this.nameInputRef.nativeElement.value,dateCreated:new Date().toDateString()};
    // this.msg.newSection(newSection);
    // this.sections=this.msg.getAllSections();
    this.sectionService.newSection(this.nameInputRef.nativeElement.value);
    this.visible = !this.visible;
  }

  // onToggleSidebar() {
  //   this.Opened = !this.Opened;
  // }
  // onClose(){
  //   this.Opened = !this.Opened;
  // }
}
