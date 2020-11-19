import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import {FormControl, FormGroup, Validators, } from '@angular/forms';
import {AuthServiceService} from '../services/auth-service.service';
import {DataService } from '../services/data.service';
import {MessengerService} from '../services/messenger.service';
import { SectionService } from '../services/section.service';
import {User } from '../models/model';

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
  user:User;
  generalSection:any;

  constructor(private route: Router,private authService:AuthServiceService,private userInfo:DataService,private msg:MessengerService,private sectionService:SectionService) { }

  ngOnInit(): void {
    this.getGeneralSection();
    this.LogInForm = new FormGroup({
      email: new FormControl(null, [Validators.required, Validators.email]),
      password: new FormControl(null, Validators.required),
      rememberMe: new FormControl(null),
    });
  }

  async getGeneralSection(){
    this.generalSection = await this.sectionService.getGeneralSection();
    console.log("general section info",this.generalSection.id);
  }

  onSubmit(){
    let email = this.LogInForm.value.email;
    this.authService.SignIn(this.LogInForm.value.email,this.LogInForm.value.password).then(async ()=>{
       let userobj =  await this.msg.getUser(email);
       this.user={firstName:userobj.firstName,lastName:userobj.lastName,email:userobj.email,role:userobj.role,creationdeletionPrivilege:userobj.creationdeletionPrivilege,sharedResources:userobj.sharedResources
      , isAdmin:userobj.isAdmin,accessList:userobj.accessList};
       console.log("lgoing",this.user, "email",this.LogInForm.value.email);
       this.userInfo.setActiveUser(this.user);
      // this.route.navigate(["home/content/"+this.generalSection.id+"/"+this.generalSection.name+"/"+this.generalSection.id+"/"+this.generalSection.name]);
      this.route.navigate(["home/content/dashboard"]);
      console.log(this.LogInForm);
    }).catch(err=>{
      this.errorMessage = err.message;
      console.log("this is the error from login page",err);
      this.isValid = true;
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
