import { User } from './../models/user.model';

import { Router } from '@angular/router';
import { Component, OnInit , Output, EventEmitter} from '@angular/core';
import { SectionService } from '../services/section.service';

@Component({
  selector: 'app-hompage',
  templateUrl: './hompage.component.html',
  styleUrls: ['./hompage.component.scss']
})
export class HompageComponent implements OnInit {
  modalState: boolean;
  userDetails: User;
  showMenu: boolean;
  @Output() menuClicked = new EventEmitter<any>();
  constructor(private route: Router, private sectionService: SectionService) { }

  ngOnInit(): void {
    this.route.navigate(['content', 'general']);
    this.sectionService.toggleMenu.subscribe(data=>{
      if(this.showMenu==false){
        this.showMenu = true;
      }
      else{
        this.showMenu = data;
      }
      
    })

  }

  onToggleMenu(){
    this.showMenu = !this.showMenu;
  }

}
