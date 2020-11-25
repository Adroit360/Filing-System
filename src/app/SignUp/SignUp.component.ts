import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import {FormControl, FormGroup, Validators, } from '@angular/forms';
import {MessengerService} from '../services/messenger.service';
import { SectionService } from '../services/section.service';
// import {User } from '../models/model';

@Component({
  selector: 'app-SignUp',
  templateUrl: './SignUp.component.html',
  styleUrls: ['./signUp.component.scss']
})

export class SignUpComponent implements OnInit {
  SignUpForm: FormGroup;
  isValid = false; // this property checks if the form is valid or if the name is in the database
  forgot=false;
  errorMessage:string ="";
  // user:User;
  generalSection:any;

  constructor(private route: Router,private msg:MessengerService,private sectionService:SectionService) { }

  ngOnInit(): void {
    // this.getGeneralSection();
    this.SignUpForm = new FormGroup({
      email: new FormControl(null, [Validators.required, Validators.email]),
      companyName: new FormControl(null, Validators.required),
      contact: new FormControl(null),
      description: new FormControl(null),
      country: new FormControl(null)

    });
  }

  // async getGeneralSection(){

  //   console.log("general section info",this.generalSection.id);
  // }

  onSubmit(){
    console.log(this.SignUpForm.value);
  }

  onToggle(){
    this.forgot = !this.forgot;
  }

  // onModalResult (result: boolean){
  //   console.log(result);
  //   this.forgot= result;
  // }
  onLogin(){
    this.route.navigate(['login'])
  }

}
