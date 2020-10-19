import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import {ActivatedRoute, Params, Router} from '@angular/router'
import { Section } from '../models/model';
import { SectionService } from '../services/Section.service';
import {MessengerService} from '../services/messenger.service';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss']
})
export class MenuComponent implements OnInit {

@ViewChild ('newSection') nameInputRef: ElementRef;

  visible = true; // ng template
  Opened = false;

  sections: any;



  constructor(private sectionService: SectionService, private router: Router, private route: ActivatedRoute,private msg:MessengerService) { }

  ngOnInit(): void {
    // this.sections = this.sectionService.getSection();
    this.sections=this.msg.getAllSections();//.then(result=>{this.sections=result; console.log(this.sections);});
   
  }

  toggle(){
    this.visible = !this.visible;
  }

  onSelected(item){
    this.sectionService.displaysection(item);
  }

  onAddedItem(){
    let newSection:Section={id:"",name:this.nameInputRef.nativeElement.value,dateCreated:new Date().toDateString(),items:[]};
    this.msg.newSection(newSection);
    this.sections=this.msg.getAllSections();
    this.visible = !this.visible;
  }

  // onToggleSidebar() {
  //   this.Opened = !this.Opened;
  // }
  // onClose(){
  //   this.Opened = !this.Opened;
  // }
}
