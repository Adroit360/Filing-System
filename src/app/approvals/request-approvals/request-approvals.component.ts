import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ApprovalService } from 'src/app/services/approval.service';

@Component({
  selector: 'app-request-approvals',
  templateUrl: './request-approvals.component.html',
  styleUrls: ['./request-approvals.component.scss']
})
export class RequestApprovalsComponent implements OnInit {
  RequestApproval: FormGroup
  @Output("onResult") OnResult:EventEmitter<boolean> = new EventEmitter();
  constructor( private approve: ApprovalService) { }

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

  onSubmit(){
    //this.OnResult.emit(false);
    this.approve.requestApproval.subscribe((item)=>console.log(item));
  }

}
