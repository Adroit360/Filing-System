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
  toggleMenu: boolean;
  @Output() menuClicked = new EventEmitter<any>();
  constructor(private route: Router, private sectionService: SectionService) { }

  ngOnInit(): void {
    // this.route.navigate(['content', 'general']);
    this.sectionService.toggleMenuBar.subscribe(
      data =>{
        this.toggleMenu = data;

      }
    );
  }

  onToggleMenu(){
    let checkbox: any = document.querySelector('#check');
    //checkbox.checked = false;
    this.toggleMenu= false;
    this.sectionService.onToggleMenu(false);
    this.sectionService.onToggleCloseMenu(false);

  }
}
