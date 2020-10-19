import { Component, OnInit } from '@angular/core';
import { Group } from 'src/app/models/group.model';
import { UserGroupsService } from 'src/app/services/UserGroups.service';

@Component({
  selector: 'app-manage-user-groups',
  templateUrl: './manage-user-groups.component.html',
  styleUrls: ['./manage-user-groups.component.scss']
})
export class ManageUserGroupsComponent implements OnInit {
  // will change the date created to a Date type later
  userGroups: Group[]=[];

  constructor( private usergroups:UserGroupsService) { }

  ngOnInit(): void {
    this.userGroups=this.usergroups.getuserGroups();
  }

  onDeleteGroup(item:any){
    this.usergroups.onDeleteuserGroups(item);
    this.userGroups=this.usergroups.getuserGroups();
  }



}
