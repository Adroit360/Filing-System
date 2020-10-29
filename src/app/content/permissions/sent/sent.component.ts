import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-sent',
  templateUrl: './sent.component.html',
  styleUrls: ['./sent.component.scss']
})
export class SentComponent implements OnInit {

  permissionDetails =[{email: 'nadum@adroit360.com', date: '18/09/2020'},
  {email: 'nadum@adroit360.com', date: '18/09/2020'},
  {email: 'nadum@adroit360.com', date: '18/09/2020'},
  {email: 'nadum@adroit360.com', date: '18/09/2020'},
  {email: 'nadum@adroit360.com', date: '18/09/2020'},
  {email: 'nadum@adroit360.com', date: '18/09/2020'},
  {email: 'nadum@adroit360.com', date: '18/09/2020'},
  {email: 'nadum@adroit360.com', date: '18/09/2020'},
  {email: 'nadum@adroit360.com', date: '18/09/2020'},
  {email: 'nadum@adroit360.com', date: '18/09/2020'},
  {email: 'nadum@adroit360.com', date: '18/09/2020'},

]
  constructor() { }

  ngOnInit(): void {
  }

  sentClicked(){

  }

}
