import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-new-folder',
  templateUrl: './new-folder.component.html',
  styleUrls: ['./new-folder.component.scss']
})
export class NewFolderComponent implements OnInit {
  NewFolder: FormGroup;
  @Output('onResult') onResult:EventEmitter<boolean>=new EventEmitter();
  constructor() { }

  ngOnInit(): void {
    this.NewFolder=new FormGroup({
      newfolder: new FormControl(null, Validators.required),
      security: new FormControl('public', Validators.required)
    })
  }

  onSubmit(value:boolean){
    console.log(this.NewFolder);
    this.onResult.emit(value);
  }

  onBack(value:boolean){
    this.onResult.emit(value);
    console.log('onBack',value);
    }


}
