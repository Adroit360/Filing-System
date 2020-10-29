import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-request-approvals',
  templateUrl: './request-approvals.component.html',
  styleUrls: ['./request-approvals.component.scss']
})
export class RequestApprovalsComponent implements OnInit {
  RequestApproval: FormGroup
  constructor() { }

  ngOnInit(): void {
    this.RequestApproval = new FormGroup({
      Title: new FormControl(null,Validators.required),
      Message: new FormControl(null, Validators.required),
      Deadline: new FormControl(null,Validators.required),
      email: new FormControl(null,[Validators.required, Validators.email])
    })
  }

  chooseOption(value: boolean){

  }

  onSubmit(){

  }

}
