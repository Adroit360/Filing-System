import { Component, OnInit } from '@angular/core';
import { ApprovalService } from '../../../services/approval.service';
import { DataService } from '../../../services/data.service';

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

sentRequests:any;
receiveRequests:any;
currentUser:string;
  constructor(private approvalManager: ApprovalService,private userVolatileData:DataService) {
    this.currentUser = userVolatileData.getActiveUser().email;
    this.getRequests();
  }


  ngOnInit(): void {
  }

  sentClicked(){

  }

  async getRequests(){
    this.sentRequests = await this.approvalManager.GetSentRequest(this.currentUser);
  }


  onDelete(){
    console.log('deleted')
  }
}
