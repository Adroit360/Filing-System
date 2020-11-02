import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-received',
  templateUrl: './received.component.html',
  styleUrls: ['./received.component.scss']
})
export class ReceivedComponent implements OnInit {
 receivedPermissionDetails =[{email: 'nadum@adroit360.com', date: '18/09/2020'},
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
thumbClicked = false;
  constructor() { }

  ngOnInit(): void {
  }


  onThumbClicked(){
    this.thumbClicked = !this.thumbClicked;
  }
  onModalResult(value){
    this.thumbClicked = value;
  }
}
