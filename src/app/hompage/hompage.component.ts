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
    if (screen.width>800){
      let menu: any =  document.querySelector('.menu');
      menu.style.display = 'block';
    }
    else{
      this.sectionService.toggleMenu.subscribe(data=>{
        let menu: any =  document.querySelector('.menu');
        if(this.showMenu==false){
          this.showMenu = true;
          if(this.showMenu){
            menu.style.display = 'block';
          }
          else{
            menu.style.display = 'none';
          }
        }
        else{
          this.showMenu = data;
          if(this.showMenu){
            menu.style.display = 'block';
          }
          else{
            menu.style.display = 'none';
          }
        }
        
        
      })
    }
    

  }

  onToggleMenu(){
  let menu: any =  document.querySelector('.menu');
    // menu.style.display = 'block';
    this.showMenu = !this.showMenu;
    if (screen.width>800){
      menu.style.display = 'block';
    }
    else if(this.showMenu){
      menu.style.display = 'block';
    }
    else{
      menu.style.display = 'none';
    }
  }

}
