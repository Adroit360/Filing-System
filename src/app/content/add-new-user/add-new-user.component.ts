import { Component, OnInit } from '@angular/core';
import {FormGroup, FormControl, Validators} from '@angular/forms';
import { Router } from '@angular/router';
import {MessengerService} from '../../services/messenger.service';

@Component({
  selector: 'app-add-new-user',
  templateUrl: './add-new-user.component.html',
  styleUrls: ['./add-new-user.component.scss']
})
export class AddNewUserComponent implements OnInit {
  addUserForm: FormGroup;
  errorMessage:string="";

  constructor( private router: Router, private messenger:MessengerService ) { }

  ngOnInit(): void {
    this.addUserForm = new FormGroup({
      firstName: new FormControl(null,Validators.required),
      lastName: new FormControl(null, Validators.required),
      role: new FormControl(null,Validators.required),
      email: new FormControl(null,[Validators.required, Validators.email])
    })

  }

  onSubmit(){
    console.log(this.addUserForm.value);
    this.messenger.NewUser(this.addUserForm.value.firstName,this.addUserForm.value.lastName,
      this.addUserForm.value.email,this.addUserForm.value.role).then((res)=>{
        
        this.errorMessage=res;
        if(!res){
          this.router.navigate(['home/content/manageUsers']);
        }
       
       }).catch(err=>{
         console.log(err);
         return;
       });
  }
  onCancel(){
  }
}
