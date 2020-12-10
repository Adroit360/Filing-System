import { SectionService } from 'src/app/services/section.service';
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
  togglePermissions: boolean;
  toggleChat: boolean;



  constructor(private approvalManager: ApprovalService,private userVolatileData:DataService, private sectionService: SectionService) {
    this.currentUser = userVolatileData.getActiveUser().email;
    approvalManager.GetReceiveRequest(this.currentUser,userVolatileData.getEntity()).subscribe(result=>{
      this.unapprovedRequest =0;
      if(result){
        result.forEach(req=>{if (!req.approvalStatus){this.unapprovedRequest++;}})
      }
    });
  }


  ngOnInit(): void {
    this.sectionService.toggleChatAndAprovals.subscribe(data=>{
      this.togglePermissions = data;
      console.log(this.togglePermissions);
    })
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
