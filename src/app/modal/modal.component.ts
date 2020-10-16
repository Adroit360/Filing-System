
import { Component, EventEmitter, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-modal',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.scss']
})
export class ModalComponent implements OnInit {

  constructor() { }

  @Output("onResult") OnResult:EventEmitter<boolean> = new EventEmitter();

  ngOnInit(): void {

  }


  chooseOption(value:boolean){

    this.OnResult.emit(value);

  }

}
