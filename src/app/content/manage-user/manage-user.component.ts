import { Router } from '@angular/router';
import { Component, OnInit, Output } from '@angular/core';
import { UserService } from 'src/app/services/User.service';
import { User } from '../../models/model';
import {MessengerService} from '../../services/messenger.service';
import {DataService} from '../../services/data.service';

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
 users:any=[];
  constructor( private data:DataService,private userdetails: UserService, private route: Router, private msg:MessengerService) { 
    this.msg.getUsers().then(result=>{this.users=result});
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
      this.msg.removeUser(this.user.email);
      this.msg.getUsers().then(result=>{this.users=result});
      this.modalState=false;
    }
    else{
      this.modalState = false;
    }
  }

  onEdit(user){
    this.data.setSelectedUser(user);
    this.route.navigate(['/home/content/editUserDetails']);
  }

  addPage()
  {
    this.route.navigate(['/home/content/AddUser']);
  }

}
