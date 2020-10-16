import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/services/User.service';
import { User } from '../../models/user.model';

@Component({
  selector: 'app-manage-user',
  templateUrl: './manage-user.component.html',
  styleUrls: ['./manage-user.component.scss']
})
export class ManageUserComponent implements OnInit {
 userDetails: User[] = [];
   constructor( private userdetails: UserService, private route: Router) { }

  ngOnInit(): void {
    this.userDetails = this.userdetails.getuserDetails();
  }

  Ondelected(item:any){
    this.userdetails.onDeleteUser(item);
    this.userDetails=this.userdetails.getuserDetails();
    console.log(item)
  }

  onEdit(item:any){

  }
  addPage(){
    this.route.navigate(['/home/content/AddUser']);
  }

}
