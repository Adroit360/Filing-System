import { Router } from '@angular/router';
import { Component, OnInit, Output } from '@angular/core';
// import { UserService } from 'src/app/services/User.service';
import { User } from '../../models/model';
import {MessengerService} from '../../services/messenger.service';
import {DataService} from '../../services/data.service';
import { EntitiesService } from '../../services/entities.service';

@Component({
  selector: 'app-manage-user',
  templateUrl: './manage-user.component.html',
  styleUrls: ['./manage-user.component.scss']
})
export class ManageUserComponent implements OnInit {
 userDetails: User[] = [];
 @Output() message: string;
 delete: boolean;
 user: User;
 modalState: boolean;
 users:any;
  constructor( private data:DataService, private route: Router, private entityManager:EntitiesService) { 
    this.users = entityManager.getEntityUsers(this.data.getEntity());
  }

  ngOnInit(): void {
    // this.userDetails = this.userdetails.getuserDetails();  
  }

  Ondelected(item:any){
    this.message = 'Are you sure you want to delete user?';
    this.modalState = true;
    this.user = item;   
  }

  onModalResult(result:boolean){
    if(result){
       // this.userdetails.onDeleteUser(this.user);
      // this.userDetails = this.userdetails.getuserDetails();
      this.entityManager.removeEntityUser(this.user.email,this.data.getEntity());
      this.modalState=false;
    }
    else{
      this.modalState = false;
    }
  }

  onEdit(user){
    // this.data.setActiveUser(user);
    this.data.setEditUSerInfo(user);
    this.route.navigate(['/home/content/editUserDetails']);
  }

  addPage()
  {
    this.route.navigate(['/home/content/AddUser']);
  }

  OnSettings(email){
    this.data.selectUserForAccessSetting(email);
    this.route.navigate(['/home/content/user-settings']);
  }

}
