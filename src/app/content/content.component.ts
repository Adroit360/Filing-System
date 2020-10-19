import { Component, OnInit } from '@angular/core';
import { SectionService } from '../services/Section.service';

@Component({
  selector: 'app-content',
  templateUrl: './content.component.html',
  styleUrls: ['./content.component.scss']
})
export class ContentComponent implements OnInit {
  displaySection:string
  constructor(private sectionservice: SectionService) { }

  ngOnInit(): void {
  }

  disp(){
    this.sectionservice.displaysection;
  }

}
