import { Router } from '@angular/router';
import { AfterViewInit, Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import {FormControl, FormGroup, Validators, } from '@angular/forms';
import { SectionService } from '../services/section.service';
import { EntitiesService } from '../services/entities.service';
// import {User } from '../models/model';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { MessengerService } from '../services/messenger.service';

@Component({
  selector: 'app-SignUp',
  templateUrl: './SignUp.component.html',
  styleUrls: ['./signUp.component.scss']
})

export class SignUpComponent implements OnInit,AfterViewInit {
  SignUpForm: FormGroup;
  isValid = false; // this property checks if the form is valid or if the name is in the database
  forgot=false;
  errorMessage:string ="";
  // user:User;
  generalSection:any;
  countryApi:string ="https://restcountries.eu/rest/v2/";
  countries:any=[];
  subscriptionPlans:any=[];

  @ViewChild("dropDown",{static:true}) dropDown:ElementRef;

  constructor(private msg:MessengerService, private http:HttpClient,private route: Router,private entityManager:EntitiesService,private sectionService:SectionService) {
      http.get(this.countryApi).subscribe(result=>{
        this.countries=result;
      });
     
      // get subscription packages
      msg.getSubscriptionPlans().subscribe(result=>{
        this.subscriptionPlans=result;
        console.log("this is subscription plan ",result)
      });


   }

  ngAfterViewInit(): void {
    //Called after ngAfterContentInit when the component's view has been initialized. Applies to components only.
    //Add 'implements AfterViewInit' to the class.
    // setTimeout(()=>{
    //   console.dir(this.dropDown.nativeElement);
    //   this.dropDown.nativeElement.selectedIndex = 85;
    // },500);


  }

  ngOnInit(): void {
    // this.getGeneralSection();

    this.SignUpForm = new FormGroup({
      email: new FormControl(null, [Validators.required, Validators.email]),
      companyName: new FormControl(null, Validators.required),
      contact: new FormControl(null),
      description: new FormControl(null),
      country: new FormControl(null),
      subscription: new FormControl(null)

    });
  }


  onSubmit(){
    console.log(this.SignUpForm.value);
    // register new entity
    this.entityManager.NewEntity(this.SignUpForm.value.companyName,this.SignUpForm.value.email,this.SignUpForm.value.contact,
     this.SignUpForm.value.country, this.SignUpForm.value.description,this.SignUpForm.value.subscription);
      this.route.navigate(['login'])
  }

  onToggle(){
    this.forgot = !this.forgot;
  }

  onLogin(){
    this.route.navigate(['login'])
  }

}