import { Component, OnInit } from '@angular/core';
import { Group } from 'src/app/models/group.model';
import { UserGroupsService } from 'src/app/services/UserGroups.service';

@Component({
  selector: 'app-shared-resources',
  templateUrl: './shared-resources.component.html',
  styleUrls: ['./shared-resources.component.scss']
})
export class SharedResourcesComponent implements OnInit {
  userGroups: Group[]=[];
  constructor(private usergroups:UserGroupsService) { }

  ngOnInit(): void {
    this.userGroups=this.usergroups.getuserGroups();
  }

  onDeleteGroup(item:any){
    this.usergroups.onDeleteuserGroups(item);
    this.userGroups=this.usergroups.getuserGroups();
  }
}
