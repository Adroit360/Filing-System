import { Router } from '@angular/router';
import { THIS_EXPR } from '@angular/compiler/src/output/output_ast';
import { Component, OnInit } from '@angular/core';
import { Subject } from 'rxjs';

import { UserService } from '../services/User.service';

@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.scss']
})
export class NavBarComponent implements OnInit {
  constructor( private userservice: UserService, private router: Router) { }

  ngOnInit(): void {


  }

  // routes to the log in page 
  onLogOut(){
    this.router.navigate(["login"]);
  }


}
