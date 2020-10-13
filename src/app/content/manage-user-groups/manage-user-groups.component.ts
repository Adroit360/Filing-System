import { Component, OnInit } from '@angular/core';
import { Group } from 'src/app/models/group.model';

@Component({
  selector: 'app-manage-user-groups',
  templateUrl: './manage-user-groups.component.html',
  styleUrls: ['./manage-user-groups.component.scss']
})
export class ManageUserGroupsComponent implements OnInit {
  // will change the date created to a Date type later
  userGroups: Group[]=[
    new Group('Finance', '20','20-20-19'),
    new Group('Finance', '20','20-20-19'),
    new Group('Finance', '20','20-20-19'),
    new Group('Finance', '20','20-20-19'),

  ]

  constructor() { }

  ngOnInit(): void {
  }

}
