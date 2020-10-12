import { Component, OnInit } from '@angular/core';
import { User } from './user.model';

@Component({
  selector: 'app-manage-user',
  templateUrl: './manage-user.component.html',
  styleUrls: ['./manage-user.component.scss']
})
export class ManageUserComponent implements OnInit {
 userDetails: User[]=[
   new User('adumatta@gmail.com','Nana', 'Kwaku', 'director'),
   new User('adumatta@gmail.com','Nana', 'Kwaku', 'director'),
   new User('adumatta@gmail.com','Nana', 'Kwaku', 'director'),
   new User('adumatta@gmail.com','Nana', 'Kwaku', 'director'),
   new User('adumatta@gmail.com','Nana', 'Kwaku', 'director')
 ]
  constructor() { }

  ngOnInit(): void {
  }

}
