import { Component, OnInit } from '@angular/core';
// import { SectionService } from '../services/section.service';
import {DataService } from '../services/data.service';

@Component({
  selector: 'app-content',
  templateUrl: './content.component.html',
  styleUrls: ['./content.component.scss']
})
export class ContentComponent implements OnInit {
  displaySection:string
  constructor(private userInfo:DataService) {
      userInfo.getAccessList();
   }

  ngOnInit(): void {
  }

  disp(){
    // this.sectionservice.displaysection;
  }

}
