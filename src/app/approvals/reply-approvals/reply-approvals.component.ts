import { Component, OnInit,EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-reply-approvals',
  templateUrl: './reply-approvals.component.html',
  styleUrls: ['./reply-approvals.component.scss']
})
export class ReplyApprovalsComponent implements OnInit {
  @Output("onResult") OnResult:EventEmitter<boolean> = new EventEmitter();
  constructor() { }

  ngOnInit(): void {
  }

  chooseOption(value:boolean){

    this.OnResult.emit(value);

  }
}
