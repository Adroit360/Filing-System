import { SectionService } from 'src/services/section.service';
import { Component, OnInit } from '@angular/core';
// import { SectionService } fro../services/section.serviceice';
import {DataService } from '../../services/data.service';
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
    let blackBox: any = document.querySelector('#open-chat');
    blackBox.checked = false;
   this.sectionService.onToggleChats(true);
  }


  onOpenApprovals(){
    let blackBox: any = document.querySelector('#open-chat');
    blackBox.checked = false;
    this.sectionService.onToggleApprovals(true);
  }
}
