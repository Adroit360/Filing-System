import { Router } from '@angular/router';
import { Component, OnInit, Output } from '@angular/core';
import { UserService } from 'src/app/services/User.service';
import { User } from '../../models/user.model';

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
 searchText;
  constructor( private userdetails: UserService, private route: Router) { }

  ngOnInit(): void {
    this.userDetails = this.userdetails.getuserDetails();
  }

  Ondelected(item:any){
    this.message = 'Are you sure you want to delete user?';
    this.modalState = true;
    this.user = item;

  }

  onModalResult(result:boolean){
    if(result){
      this.userdetails.onDeleteUser(this.user);
      this.userDetails = this.userdetails.getuserDetails();
      this.modalState=false;
    }
    else{
      this.modalState = false;
    }
  }

  onEdit(item: any, index:any){
    this.route.navigate(['/home/content/editUserDetails']);
    this.userdetails.onEditUSer(item, index);
  }
  addPage(){
    this.route.navigate(['/home/content/AddUser']);
  }
}
