import { SectionService } from 'src/app/services/section.service';
import { Component, OnInit } from '@angular/core';
// import { SectionService } fro../services/section.serviceice';
import {DataService } from '../services/data.service';
import { HostListener } from "@angular/core";


@Component({
  selector: 'app-content',
  templateUrl: './content.component.html',
  styleUrls: ['./content.component.scss']
})
export class ContentComponent implements OnInit {
  displaySection:string
  openApprovals: boolean=false;
  isMobile = false;
  


  constructor(private userInfo:DataService, private sectionService:  SectionService) {
      userInfo.getAccessList();
      
   }

  ngOnInit(): void {
    // let width: any = window.screen;
    // console.log(width);
    // if (width <= 800) {
    //   this.isMobile = true;
      
    // }
  }

  disp(){
    // this.sectionservice.displaysection;
  }
  onOpenChat(){
   this.sectionService.onToggleChats(true);
   
 
  }
  onOpenApprovals(){
    this.sectionService.onToggleApprovals(true);
    
  }
}
