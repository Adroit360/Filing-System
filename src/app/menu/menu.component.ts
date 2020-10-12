import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router'
import { Section } from '../models/section.model';
import { SectionService } from '../services/Section.service';
@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss']
})
export class MenuComponent implements OnInit {

@ViewChild ('newSection') nameInputRef: ElementRef;

visible = true;
sections: Section [];



  constructor(private sectionService: SectionService, private router: Router, private route :ActivatedRoute) { }

  ngOnInit(): void {
    this.sections=this.sectionService.getSection();
  }

  toggle(){
    this.visible=!this.visible;
  }

  onAddedItem(){
    const newSection= new Section(this.nameInputRef.nativeElement.value);
   this.sections.push(newSection);
   this.visible=!this.visible;
  }

  onSelected( id: number, section: Section){
    console.log(id , section);
}

}
