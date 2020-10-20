import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { stringify } from 'querystring';
import { UserService } from 'src/app/services/User.service';
import {DataService} from '../../services/data.service';
import {MessengerService} from '../../services/messenger.service';

@Component({
  selector: 'app-edit-user-details',
  templateUrl: './edit-user-details.component.html',
  styleUrls: ['./edit-user-details.component.scss']
})
export class EditUserDetailsComponent implements OnInit {
EditUserDetails: FormGroup = new FormGroup({
  firstName: new FormControl(null),
  lastName: new FormControl(null),
  role: new FormControl(null),
  email: new FormControl(null),
});

selectedUser:any;

index: number;
firstName: string;
lastName: string;
role:string;
email: string;
  constructor(private userdetails: UserService,private route:Router,private data:DataService,private msg:MessengerService) {
      console.log("data from data service",data.getSelectedUser());
      this.selectedUser = data.getSelectedUser();
   }

  ngOnInit(): void {

    this.userdetails.EditUser
    .subscribe((item :{details: any, position: any})=>{
      this.firstName=this.selectedUser.firstName,
      this.lastName= this.selectedUser.lastName,
      this.role= this.selectedUser.role,
      this.email=this.selectedUser.email
      // this.index = item.position;

     

    });

    this.EditUserDetails.setValue({
      "email": this.email??"",
      "firstName": this.firstName ?? "",
      "lastName": this.lastName ?? "",
      "role": this.role?? "",

    });

  }
//uodating user details
  onUpdate(){
  this.userdetails.UpdateUser(this.EditUserDetails.value,this.index);
  console.log("edit form",this.EditUserDetails);
  let editData = {email: this.selectedUser.email,firstName:this.EditUserDetails.value.firstName, lastName:this.EditUserDetails.value.lastName,role: this.EditUserDetails.value.role};
  console.log(editData);
  this.msg.updateUser(editData);
  this.route.navigate(['home/content/manageUsers']);
  }

//Cancelling the update
onCancel(){

    this.route.navigate(['home/content/manageUsers'])

}
}








