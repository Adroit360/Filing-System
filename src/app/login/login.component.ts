import { Router } from '@angular/router';
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
  forgot = false;
  constructor(private route: Router) { }

  ngOnInit(): void {
    this.LogInForm = new FormGroup({
      email: new FormControl(null, [Validators.required, Validators.email]),
      password: new FormControl(null, Validators.required),
      rememberMe: new FormControl(null),
    });
  }

  onSubmit(){
    this.route.navigate(['home/content/0/general']);
    console.log(this.LogInForm);

  }
  onToggle(){
    this.forgot = !this.forgot;
  }

  onModalResult (result: boolean){
    console.log(result);
    this.forgot= result;
  }

}
