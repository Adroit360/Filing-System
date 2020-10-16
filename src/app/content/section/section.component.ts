import { Component, OnInit } from '@angular/core';
import { Section } from 'src/app/models/section.model';
import { SectionService } from 'src/app/services/Section.service';

@Component({
  selector: 'app-section',
  templateUrl: './section.component.html',
  styleUrls: ['./section.component.scss']
})
export class SectionComponent implements OnInit {
  heading: string;
  createfolder=false;
  constructor(private section: SectionService) { }

  ngOnInit(): void {
    this.section.sectionName
      .subscribe(item => {this.heading = item; console.log(this.heading)});

  }

  newfolder(){
 this.createfolder=!this.createfolder;
  }

  onModalResult (result: boolean){
    console.log(result);
    this.createfolder= result;
  }

}
