import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import {FormControl, FormGroup, Validators, } from '@angular/forms';
import { SectionService } from '../services/section.service';
import { EntitiesService } from '../services/entities.service';
// import {User } from '../models/model';
import { HttpClient, HttpHeaders } from '@angular/common/http';

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
  countryApi:string ="https://api.first.org/data/v1/countries";
  countries:any=[];

  constructor(private http:HttpClient,private route: Router,private entityManager:EntitiesService,private sectionService:SectionService) {
      http.get(this.countryApi).subscribe(result=>{
        this.countries=result;
        console.log("countries" , this.countries.data);
      })
   }

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
    // register new entity
    this.entityManager.NewEntity(this.SignUpForm.value.companyName,this.SignUpForm.value.email,this.SignUpForm.value.contact,
     this.SignUpForm.value.country,new Date().toLocaleString(), this.SignUpForm.value.description);
      this.route.navigate(['login'])
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
