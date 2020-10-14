import { Component, OnInit } from '@angular/core';
import {FormGroup, FormControl, Validators} from '@angular/forms';
import { Router } from '@angular/router';
import { UserService } from 'src/app/services/User.service';
@Component({
  selector: 'app-add-new-user',
  templateUrl: './add-new-user.component.html',
  styleUrls: ['./add-new-user.component.scss']
})
export class AddNewUserComponent implements OnInit {
  addUserForm: FormGroup;

  constructor( private newuser:UserService, private router: Router ) { }

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
    this.newuser.addNewUser({
      Email: this.addUserForm.value.email,
      FirstName: this.addUserForm.value.firstName,
      LastName: this.addUserForm.value.lastName,
      position: this.addUserForm.value.role
    });

    this.router.navigate(['/manageUsers']);
  }
}
