import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-permissions',
  templateUrl: './permissions.component.html',
  styleUrls: ['./permissions.component.scss']
})
export class PermissionsComponent implements OnInit {
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
  {email: 'nadum@adroit360.com', date: '18/09/2020'}



]
  constructor() { }

  ngOnInit(): void {
  }

}
