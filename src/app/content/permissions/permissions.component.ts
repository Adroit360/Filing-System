import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-permissions',
  templateUrl: './permissions.component.html',
  styleUrls: ['./permissions.component.scss']
})
export class PermissionsComponent implements OnInit {
  showSent = true;
  showReceived = false;
;
  constructor() { }

  ngOnInit(): void {
  }

  onSentClicked(){
    this.showSent = true;
    this.showReceived = false;
  }

  onReceivedClicked(){
    this.showReceived= true;
    this.showSent= false;
    
  }

}
