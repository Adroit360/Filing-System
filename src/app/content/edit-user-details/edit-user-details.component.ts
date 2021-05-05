import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { stringify } from 'querystring';
import { UserService } from 'src/services/User.service';
import {DataService} from '../../../services/data.service';
import {EntitiesService} from '../../../services/entities.service';

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
  email: new FormControl({disable:true}),
});
invalidInput:string;
selectedUser:any;

index: number;
firstName: string;
lastName: string;
role:string;
email: string;
  constructor(private userdetails: UserService,private route:Router,private data:DataService,private entityManager:EntitiesService) {    
      // this.selectedUser = data.getActiveUser();
   }

  ngOnInit(): void {

    this.data.EditUser
    .subscribe((item)=>{
      this.firstName=item.details.firstName,
      this.lastName= item.details.lastName,
      this.role= item.details.role,
      this.email=item.details.email
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
  // this.userdetails.UpdateUser(this.EditUserDetails.value,this.index);
  if (this.EditUserDetails.value.firstName == null || this.EditUserDetails.value.firstName=="" ||
    this.EditUserDetails.value.lastName == null || this.EditUserDetails.value.lastName == "" ||
    this.EditUserDetails.value.email == null || this.EditUserDetails.value.email == "" || 
    this.EditUserDetails.value.role == null || this.EditUserDetails.value.role == "") {this.invalidInput = "Invalid input, all fields must be filled"; return;}

  console.log("edit form",this.EditUserDetails);
  let editData = {email: this.EditUserDetails.value.email,firstName:this.EditUserDetails.value.firstName, lastName:this.EditUserDetails.value.lastName,role: this.EditUserDetails.value.role};
  console.log(editData);
  this.entityManager.updateUser(editData,this.data.getEntity());
  this.route.navigate(['home/content/manageUsers']);
  }

  //Cancelling the update
  onCancel(){
      this.route.navigate(['home/content/manageUsers'])
  }

  controlFocused(){
    this.invalidInput=null;
  }

}








