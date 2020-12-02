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


  ngOnInit(): void {
  }

  sentClicked(){

  }

  async getRequests(){
    this.sentRequests = await this.approvalManager.GetSentRequest(this.currentUser,this.userVolatileData.getEntity());
  }

// calling the delete modal
  onDelete(){
    console.log("deleted")
    document.getElementById("myModal").style.display="fixed";
  }

//Deleting the message
DeleteMess(){
  document.getElementById("myModal").style.display="none";
}

//NOT deleteing the message
unDelete(){
  console.log("back");
  document.getElementById("myModal").style.display="none";
}
}
