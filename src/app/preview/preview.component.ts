import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import {DataService}  from "../services/data.service";
import { DirectoryService } from "../services/directory.service";

@Component({
  selector: 'app-preview',
  templateUrl: './preview.component.html',
  styleUrls: ['./preview.component.scss']
})
export class PreviewComponent implements OnInit {
  @Output('onResult') onResult:EventEmitter<boolean>=new EventEmitter();
  file:any;
  constructor(private data:DataService,private directory:DirectoryService) { }

  ngOnInit(): void {
  }

  onBack(value:boolean){
    this.onResult.emit(value);
    console.log('onBack',value);
    }

    async onUpload(value: boolean){
      let res = await this.directory.uploadFile(this.file,this.data.getActiveUser().email,this.data.getCurrentSection(),this.data.getCurrentDirectory());
      console.log(res,"response from upload");
      //this.onBack;
      this.onResult.emit(value);
    }

  onChange(event:any){
      this.file = event.target.files[0];
    }
}
