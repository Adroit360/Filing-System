import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { SectionService } from '../../../services/section.service';
import { DataService } from '../../../services/data.service';
import { MessengerService } from '../../../services/messenger.service';
import { EntitiesService } from '../../../services/entities.service';

@Component({
  selector: 'app-user-settings',
  templateUrl: './user-settings.component.html',
  styleUrls: ['./user-settings.component.scss']
})
export class UserSettingsComponent implements OnInit {
  // dummy data to represent the various sections
  sections:any=[];

  show_checked =  false;
  userEmail:string;
  user:any;
  accessList:any=[];

  constructor(private entityManager: EntitiesService, private sectionService:SectionService,private volatileData:DataService,private msg:MessengerService) { 
    this.userEmail = this.volatileData.getUserToSetAccess();
   
    this.updateUserAccess(this.userEmail);
    // 
    // console.log(this.accessList, "this is the user we selected");
    this.sectionService.getSections(this.volatileData.getEntity()).subscribe(_sections=>{
      this.sections = _sections;
    });

    
  }

  ngOnInit(): void {
    
  }

  // add access
  add(section){
    this.entityManager.setAccessControl(this.userEmail,section,this.volatileData.getEntity());
    this.updateUserAccess(this.userEmail);
  }

  // revoke access
  unAdd(section){
    this.entityManager.revokeAccess(this.userEmail,section,this.volatileData.getEntity());
    this.updateUserAccess(this.userEmail);
  }

  // check existence of privilege
  existInAccessList(section){
    return  this.accessList.includes(section);
  }

  async updateUserAccess(userId){
    await this.entityManager._getEntityUser(userId,this.volatileData.getEntity()).subscribe(result=>{
      this.user = result;
      this.accessList = this.user.accessList;
    });
  }
}
