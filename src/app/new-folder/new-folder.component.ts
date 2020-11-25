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
    });
  }

  async onSubmit(value:boolean){
    console.log(this.NewFolder.value, "folder name");
    console.log(this.NewFolder.value.security);
    let folderSecurityPublic = true;
    if(this.NewFolder.value.security=="private"){
        folderSecurityPublic = false;
    }
    let currentDirectory="1";
    if(this.data.getCurrentDirectory()==""){currentDirectory =await this.data.getCurrentSection();console.log(currentDirectory, "this 1 is the current diretory") }else{currentDirectory=await this.data.getCurrentDirectory();console.log(currentDirectory, "this 2 is the current diretory")}
    this.directory.createDirectory(this.NewFolder.value.newfolder,this.data.getCurrentSection(),currentDirectory,this.data.getActiveUser().email,folderSecurityPublic,this.data.getEntity());
    
    this.onResult.emit(value);
  }

  onBack(value:boolean)
  {
    this.onResult.emit(value);
    console.log('onBack',value);
  }

}
