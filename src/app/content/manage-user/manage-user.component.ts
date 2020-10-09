import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-manage-user',
  templateUrl: './manage-user.component.html',
  styleUrls: ['./manage-user.component.scss']
})
export class ManageUserComponent implements OnInit {
  userDetails: {email: string, firstName: string, lastName: string, role: string}[] = [
    {email: 'mr.adumatta@adroit360gh.com', firstName: 'Nana', lastName: 'Kweku', role: 'Director'},
    {email: 'mr.adumatta@adroit360gh.com', firstName: 'Nana', lastName: 'Kweku', role: 'Director'},
    {email: 'mr.adumatta@adroit360gh.com', firstName: 'Nana', lastName: 'Kweku', role: 'Director'},
    {email: 'mr.adumatta@adroit360gh.com', firstName: 'Nana', lastName: 'Kweku', role: 'Director'},
    {email: 'mr.adumatta@adroit360gh.com', firstName: 'Nana', lastName: 'Kweku', role: 'Director'},
    {email: 'mr.adumatta@adroit360gh.com', firstName: 'Nana', lastName: 'Kweku', role: 'Director'},
    {email: 'mr.adumatta@adroit360gh.com', firstName: 'Nana', lastName: 'Kweku', role: 'Director'},
    {email: 'mr.adumatta@adroit360gh.com', firstName: 'Nana', lastName: 'Kweku', role: 'Director'},
    {email: 'mr.adumatta@adroit360gh.com', firstName: 'Nana', lastName: 'Kweku', role: 'Director'},
    {email: 'mr.adumatta@adroit360gh.com', firstName: 'Nana', lastName: 'Kweku', role: 'Director'},
    {email: 'mr.adumatta@adroit360gh.com', firstName: 'Nana', lastName: 'Kweku', role: 'Director'},
    {email: 'mr.adumatta@adroit360gh.com', firstName: 'Nana', lastName: 'Kweku', role: 'Director'},
  ];

  constructor() { }

  ngOnInit(): void {
  }

}
