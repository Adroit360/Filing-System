import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-edit-user',
  templateUrl: './edit-user.component.html',
  styleUrls: ['./edit-user.component.scss']
})
export class EditUserComponent implements OnInit {
userGroups: {usergroupName: string, role: string}[]=[
  {usergroupName: 'Finance', role: 'Director'},
  {usergroupName: 'Finance', role: 'Director'},
  {usergroupName: 'Finance', role: 'Director'},
  {usergroupName: 'Finance', role: 'Director'},
  {usergroupName: 'Finance', role: 'Director'},
  {usergroupName: 'Finance', role: 'Director'},
  {usergroupName: 'Finance', role: 'Director'},
  {usergroupName: 'Finance', role: 'Director'},
  {usergroupName: 'Finance', role: 'Director'},
  {usergroupName: 'Finance', role: 'Director'},
  {usergroupName: 'Finance', role: 'Director'},
  {usergroupName: 'Finance', role: 'Director'},
  {usergroupName: 'Finance', role: 'Director'},
  {usergroupName: 'Finance', role: 'Director'},
]
  constructor() { }

  ngOnInit(): void {
  }

}
