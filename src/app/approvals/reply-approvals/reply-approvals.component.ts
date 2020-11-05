import { Component, OnInit,EventEmitter, Output } from '@angular/core';
import { ApprovalService } from '../../services/approval.service';
import { DataService } from '../../services/data.service';

@Component({
  selector: 'app-reply-approvals',
  templateUrl: './reply-approvals.component.html',
  styleUrls: ['./reply-approvals.component.scss']
})
export class ReplyApprovalsComponent implements OnInit {
  @Output("onResult") OnResult:EventEmitter<boolean> = new EventEmitter();
  currentUser:string;

  constructor(private approvalManager: ApprovalService,private userVolatileData:DataService)
  {
    this.currentUser = userVolatileData.getActiveUser().email;
  }

  ngOnInit(): void {
  }

  chooseOption(value:boolean){

    this.OnResult.emit(value);

  }
  onOkay(value:boolean){
    this.approvalManager.thumbsUp.subscribe(result=>console.log(result));
    this.OnResult.emit(value);
  }
}
