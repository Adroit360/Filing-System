import { Component, EventEmitter, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-preview',
  templateUrl: './preview.component.html',
  styleUrls: ['./preview.component.scss']
})
export class PreviewComponent implements OnInit {
  @Output('onResult') onResult:EventEmitter<boolean>=new EventEmitter();
  constructor() { }

  ngOnInit(): void {
  }

  onBack(value:boolean){
    this.onResult.emit(value);
    console.log('onBack',value);
    }

    onUpload(){
      console.log("Submitted");
    }

    onChange(){

    }
}
