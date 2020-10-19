import { InteractionService } from './../../services/interaction.service';
import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/services/User.service';
import { User } from '../../models/model';
import {MessengerService} from '../../services/messenger.service';

@Component({
  selector: 'app-manage-user',
  templateUrl: './manage-user.component.html',
  styleUrls: ['./manage-user.component.scss']
})
export class ManageUserComponent implements OnInit {
 userDetails: User[] = [];
 delete: boolean;
 user: User;
 modalState: boolean;
 users:any=[];
  constructor( private userdetails: UserService, private route: Router, private modal: InteractionService,private msg:MessengerService) { 
    this.msg.getUsers().then(result=>{this.users=result});
  }

  ngOnInit(): void {
    // this.userDetails = this.userdetails.getuserDetails();
    
  }

  Ondelected(item:any){
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

  onEdit(item: any){

  }
  addPage(){
    this.route.navigate(['/home/content/AddUser']);
  }
}
