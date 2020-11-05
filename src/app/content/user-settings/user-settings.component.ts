import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { SectionService } from '../../services/section.service';
import { DataService } from '../../services/data.service';
import { MessengerService } from '../../services/messenger.service';

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

  constructor(private sectionService:SectionService,private volatileData:DataService,private msg:MessengerService) { 
    this.userEmail = this.volatileData.getUserToSetAccess();
   
    this.updateUserAccess(this.userEmail);
    // 
    // console.log(this.accessList, "this is the user we selected");
    this.sectionService.getSections().subscribe(_sections=>{
      this.sections = _sections;
    });

    
  }

  ngOnInit(): void {
    
  }

  // add access
  add(section){
    this.msg.setAccessControl(this.userEmail,section);
    this.updateUserAccess(this.userEmail);
  }

  // revoke access
  unAdd(section){
    this.msg.revokeAccess(this.userEmail,section);
    this.updateUserAccess(this.userEmail);
  }

  // check existence of privilege
  existInAccessList(section){
    return  this.accessList.includes(section);
  }

  async updateUserAccess(userId){
    await this.msg._getUser(userId).subscribe(result=>{
      this.user = result.data();
      this.accessList = this.user.accessList;
    });
  }
}
