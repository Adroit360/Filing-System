import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { flatMap } from 'rxjs/operators';

@Component({
  selector: 'app-user-settings',
  templateUrl: './user-settings.component.html',
  styleUrls: ['./user-settings.component.scss']
})
export class UserSettingsComponent implements OnInit {
  // dummy data to represent the various sections
  sections= ['Football', 'Marketting', 'Accounting','Finance',
  'Football', 'Marketting', 'Accounting','Finance',
  'Football', 'Marketting', 'Accounting','Finance',
  'Football', 'Marketting', 'Accounting','Finance',
  'Football', 'Marketting', 'Accounting','Finance'

];
  show_checked =  false;
  constructor() { }

  ngOnInit(): void {
    
  }

  add(){
    this.show_checked = true;
  }
  unAdd(){
    this.show_checked = false;
  }
}
