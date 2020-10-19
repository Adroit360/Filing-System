import { User } from './../models/user.model';

import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-hompage',
  templateUrl: './hompage.component.html',
  styleUrls: ['./hompage.component.scss']
})
export class HompageComponent implements OnInit {
  modalState: boolean;
  userDetails: User;
  constructor(private route: Router,) { }

  ngOnInit(): void {
    //this.route.navigate(['content', 'general']);
  }

}
