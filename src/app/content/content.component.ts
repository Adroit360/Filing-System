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
  // Declare height and width variables
  scrHeight:any;
  scrWidth:any;

  @HostListener('window:resize', ['$event'])
  getScreenSize(event?) {
        this.scrHeight = window.innerHeight;
        this.scrWidth = window.innerWidth;
        console.log(this.scrHeight, this.scrWidth);
        return this.scrWidth;
        
  }

  constructor(private userInfo:DataService, private sectionService:  SectionService) {
      userInfo.getAccessList();
      let width:any = this.getScreenSize();
      if (width<=800){
        this.isMobile = true;
        console.log(this.isMobile);
      }
      else{
        this.isMobile = false;
        console.log(this.isMobile);
      }
      
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
    // this.openApprovals = !this.openApprovals;
    // this.sectionService.onToggleMenu(this.openApprovals);
 
  }
  onOpenApprovals(){
    this.openApprovals = !this.openApprovals;
    this.sectionService.onToggleApprovals(this.openApprovals);
  }
}
