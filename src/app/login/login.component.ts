import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import {FormControl, FormGroup, Validators, } from '@angular/forms';
import {AuthServiceService} from '../services/auth-service.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  LogInForm: FormGroup;
  isValid = false; // this property checks if the form is valid or if the name is in the database
  forgot=false;
  errorMessage:string ="";

  constructor(private route: Router,private authService:AuthServiceService) { }

  ngOnInit(): void {
    this.LogInForm = new FormGroup({
      email: new FormControl(null, [Validators.required, Validators.email]),
      password: new FormControl(null, Validators.required),
      rememberMe: new FormControl(null),
    });
  }

  onSubmit(){

    this.authService.SignIn(this.LogInForm.value.email,this.LogInForm.value.password).then(()=>{
      this.route.navigate(['home/content/general']);
      console.log(this.LogInForm);
    }).catch(err=>{
      this.errorMessage = err.message;
      console.log("this is the error from login page",err);
    });

    

  }

  onToggle(){
    this.forgot = !this.forgot;
  }

  onModalResult (result: boolean){
    console.log(result);
    this.forgot= result;
  }

}
