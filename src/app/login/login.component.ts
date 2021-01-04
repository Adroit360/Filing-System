import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import {FormControl, FormGroup, Validators, } from '@angular/forms';
import {AuthServiceService} from '../services/auth-service.service';
import {DataService } from '../services/data.service';
import {MessengerService} from '../services/messenger.service';
import { SectionService } from '../services/section.service';
// import {User } from '../models/model';

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
  // user:User;
  generalSection:any;
  user;

  constructor(private route: Router,private authService:AuthServiceService,private userInfo:DataService,private msg:MessengerService,private sectionService:SectionService) {

  }

  ngOnInit(): void {

    // this.getGeneralSection();
    this.LogInForm = new FormGroup({
      email: new FormControl(null, [Validators.required, Validators.email]),
      password: new FormControl(null, Validators.required),
      rememberMe: new FormControl(null),
    });


  }


  // async getGeneralSection(){

  //   console.log("general section info",this.generalSection.id);
  // }

 async onSubmit(){
    let email = this.LogInForm.value.email;
    await this.authService.SignIn(this.LogInForm.value.email,this.LogInForm.value.password).then(async ()=>{
       let userobj =  await this.msg.getSystemUser(email);

       this.user=userobj;
       console.log("lgoing",userobj.entity);
      //  set user info as volatile data in the data service (to make user details accessible at runtime)
       await this.userInfo.setActiveUser(userobj);
      //  get the id of the general tab
      //  this.generalSection = await this.sectionService.getGeneralSection(userobj.entity);
      //  set default section and directory
      // this.userInfo.setCurrentSection(this.generalSection.id,"general");
      // this.userInfo.setCurrentDirectory(this.generalSection.id,"general");

      //Local storage
      localStorage.setItem("user", JSON.stringify(this.user));
     // route to the dashboard
      this.route.navigate(["home/content/dashboard"]);
    }).catch(err=>{
      this.errorMessage = err.message;
      console.log("this is the error from login page",err);
      this.isValid = true;
    });
  }

  onToggle(){
    this.forgot = !this.forgot;
  }
  onSignUP(){
    this.route.navigate(['SignUp']);
  }
  onModalResult (result: boolean){
    console.log(result);
    this.forgot= result;
  }

}
