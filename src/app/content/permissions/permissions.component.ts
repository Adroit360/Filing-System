import { Component, OnInit } from '@angular/core';
import { ApprovalService } from '../../services/approval.service';
import { DataService } from '../../services/data.service';

@Component({
  selector: 'app-permissions',
  templateUrl: './permissions.component.html',
  styleUrls: ['./permissions.component.scss']
})
export class PermissionsComponent implements OnInit {
  showSent = true;
  showReceived = false;
  numvan: any= true;
  currentUser:string;
  receivedRequests:any;
  unapprovedRequest=0;



  constructor(private approvalManager: ApprovalService,private userVolatileData:DataService) {
    this.currentUser = userVolatileData.getActiveUser().email;
    approvalManager.GetReceiveRequest(this.currentUser).subscribe(result=>{
      this.unapprovedRequest =0;
      if(result){
        result.forEach(req=>{if (!req.approvalStatus){this.unapprovedRequest++;}})
      }
    });
  }


  ngOnInit(): void {
  }

  onSentClicked(){
    this.showSent = true;
    this.showReceived = false;
  }

  onReceivedClicked(){
    this.showReceived= true;
    this.showSent= false;
    this.numvan=+!this.numvan
  }



}
