import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-permissions',
  templateUrl: './permissions.component.html',
  styleUrls: ['./permissions.component.scss']
})
export class PermissionsComponent implements OnInit {
  showSent = true;
  showReceived = false;
<<<<<<< HEAD
  numvan: any= true
=======


>>>>>>> 5403dab0890a25dbb659b43abce8f06cc6a9d01d
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
    this.numvan=+!this.numvan
  }

}
