import { Component, OnInit, ɵCodegenComponentFactoryResolver } from '@angular/core';
import { ApprovalService } from '../../../services/approval.service';
import { DataService } from '../../../services/data.service';

@Component({
  selector: 'app-sent',
  templateUrl: './sent.component.html',
  styleUrls: ['./sent.component.scss']
})
export class SentComponent implements OnInit {

sentRequests:any;
receiveRequests:any;
currentUser:string;
  constructor(private approvalManager: ApprovalService,private userVolatileData:DataService) {
    this.currentUser = userVolatileData.getActiveUser().email;
    this.getRequests();
  }
change=false;

  ngOnInit(): void {
  }

  sentClicked(){

  }

  async getRequests(){
    this.sentRequests = await this.approvalManager.GetSentRequest(this.currentUser,this.userVolatileData.getEntity());
  }

// calling the delete modal
  onDelete(){
    console.log("deleted");
   this.change=!this.change
  }

//Deleting the message
DeleteMess(){
  this.change=!this.change;
}

//NOT deleteing the message
unDelete(){
  console.log("back");
  this.change=!this.change;
}
}
