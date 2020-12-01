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
  message:string="";
  file:any;
  approvDoc:any;

  constructor(private approvalManager: ApprovalService,private userVolatileData:DataService)
  {
    this.currentUser = userVolatileData.getActiveUser().email;
    this.getdoc();
  }

  ngOnInit(): void 
  {
    
    
  }

  async getdoc(){
    return await this.approvalManager.thumbsUp.subscribe(result=>{this.approvDoc=result.item;console.log("approv doc",result)});
  }
  chooseOption(value:boolean)
  {
    this.OnResult.emit(value);
  }

  onOkay(value:boolean)
  {
    console.log("id of docu",this.approvDoc.id);
    let obj={id:this.approvDoc.id,message:this.message,file:this.file,}
    this.approvalManager.RespondToRequest(obj,this.userVolatileData.getEntity()); 
    this.OnResult.emit(value);
  }

  onChange(event){
    this.file = (event.target as HTMLInputElement).files[0];
  }


}
