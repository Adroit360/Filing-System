import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { AnonymousSubject } from 'rxjs/internal/Subject';
import { ApprovalService } from '../../services/approval.service';
import { DataService } from '../../services/data.service';

@Component({
  selector: 'app-request-approvals',
  templateUrl: './request-approvals.component.html',
  styleUrls: ['./request-approvals.component.scss']
})
export class RequestApprovalsComponent implements OnInit {
  RequestApproval: FormGroup
  @Output("onResult") OnResult:EventEmitter<boolean> = new EventEmitter();

  currentUser:string;
  constructor( private approvalManager: ApprovalService,private userVolatileData:DataService) {
    this.currentUser = userVolatileData.getActiveUser().email;

  }

  ngOnInit(): void {
    this.RequestApproval = new FormGroup({
      Title: new FormControl(null,Validators.required),
      Message: new FormControl(null, Validators.required),
      Deadline: new FormControl(null,Validators.required),
      email: new FormControl(null,[Validators.required, Validators.email])
    })
  }

  chooseOption(value: boolean){
    this.OnResult.emit(value);
  }

  onSubmit(value: boolean){
    //this.OnResult.emit(false);
    this.approvalManager.requestBehavior.subscribe((result)=>{ console.log(result, "requsest doc");
      let request = {documentId:result.item.id,documentName:result.item.name,documentUrl:result.item.url,requestMessage:this.RequestApproval.value.Message, title:this.RequestApproval.value.Title,
                  senderId:this.currentUser,dateCreated:new Date().toLocaleDateString(),latestApprovalDate:this.RequestApproval.value.Deadline,
                  approverId:this.RequestApproval.value.email}
        console.log(request, "request ");
      this.approvalManager.createApprovalRequest(request);
    });

    this.OnResult.emit(value);

  }

}
