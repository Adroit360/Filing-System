import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { DataService } from '../services/data.service';
import { DirectoryService } from '../services/directory.service';

@Component({
  selector: 'app-new-folder',
  templateUrl: './new-folder.component.html',
  styleUrls: ['./new-folder.component.scss']
})
export class NewFolderComponent implements OnInit {
  NewFolder: FormGroup;
  @Output('onResult') onResult:EventEmitter<boolean>=new EventEmitter();
  constructor(private data:DataService,private directory:DirectoryService) { }

  ngOnInit(): void {
    this.NewFolder=new FormGroup({
      newfolder: new FormControl(null, Validators.required),
      security: new FormControl('public', Validators.required)
    })
  }

  onSubmit(value:boolean){
    console.log(this.NewFolder.value, "folder name");
    let currentDirectory="";
    if(this.data.getCurrentDirectory()==""){currentDirectory =this.data.getCurrentSection(); }else{currentDirectory=this.data.getCurrentDirectory();}
    this.directory.createDirectory(this.NewFolder.value.newfolder,this.data.getCurrentSection(),currentDirectory,this.data.getActiveUser().email);
    this.onResult.emit(value);
  }

  onBack(value:boolean)
  {
    this.onResult.emit(value);
    console.log('onBack',value);
  }

}
