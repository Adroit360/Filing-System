import { Component, OnInit } from '@angular/core';
import {FormControl, FormGroup, Validators, } from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  LogInForm: FormGroup;
  isValid = false; // this property checks if the form is valid or if the name is in the database
  constructor() { }

  ngOnInit(): void {
    this.LogInForm = new FormGroup({
      email: new FormControl(null, [Validators.required, Validators.email]),
      password: new FormControl(null, Validators.required),
    });
  }

  onSubmit(){
    console.log(this.LogInForm);

  }

}
