import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { stringify } from 'querystring';
import { UserService } from 'src/app/services/User.service';

@Component({
  selector: 'app-edit-user-details',
  templateUrl: './edit-user-details.component.html',
  styleUrls: ['./edit-user-details.component.scss']
})
export class EditUserDetailsComponent implements OnInit {
EditUserDetails: FormGroup = new FormGroup({
  firstName: new FormControl(null),
  lastName: new FormControl(null),
  position: new FormControl(null),
  email: new FormControl(null),
});


index: number;
firstName: string;
lastName: string;
position:string;
email: string;
  constructor(private userdetails: UserService,private route:Router) {

   }

  ngOnInit(): void {

    this.userdetails.EditUser
    .subscribe((item :{details: any, position: any})=>{
      this.firstName=item.details.firstName,
      this.lastName= item.details.lastName,
      this.position= item.details.position,
      this.email=item.details.email
      this.index = item.position;

      this.EditUserDetails.setValue({
        "email": this.email??"",
        "firstName": this.firstName ?? "",
        "lastName": this.lastName ?? "",
        "position": this.position?? "",

      });

    });

  }
//uodating user details
  onUpdate(){
  this.userdetails.UpdateUser(this.EditUserDetails.value,this.index);
  this.route.navigate(['home/content/manageUsers']);
  }

//Cancelling the update
onCancel(){

    this.route.navigate(['home/content/manageUsers'])

}
}








