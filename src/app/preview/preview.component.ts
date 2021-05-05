import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import {DataService}  from "../../services/data.service";
import { DirectoryService } from "../../services/directory.service";

@Component({
  selector: 'app-preview',
  templateUrl: './preview.component.html',
  styleUrls: ['./preview.component.scss']
})
export class PreviewComponent implements OnInit {
  @Output('onResult') onResult:EventEmitter<boolean>=new EventEmitter();
  file:any;
  uploadForm: FormGroup;
  imageURL: any;
  private currentSectionID: string;
  private currentDirectory: string;
  constructor(private data:DataService,private directory:DirectoryService, public fb: FormBuilder, private activatedroute:ActivatedRoute) {
    //Reactive Form
    this.uploadForm= this.fb.group({
      avatar: [null],
      name: ['']
    })
   }

  ngOnInit(): void {
  }

  onBack(value:boolean){
    this.onResult.emit(value);
    console.log('onBack',value);
    }

    async onUpload(value: boolean){
      this.activatedroute.params.subscribe((params)=>{
        console.log("this is the route parameters",params);
        this.currentSectionID = params["sectionId"];
        this.currentDirectory = params["directoryId"];
        console.log("sectionID: ", this.currentSectionID);
        console.log("directoryID: ", this.currentDirectory);
      });
      let res = await this.directory.uploadFile(this.file,this.data.getActiveUser().email,this.currentSectionID,this.currentDirectory,this.data.getEntity());
      console.log(res,"response from upload");
      //this.onBack;
      this.onResult.emit(value);
    }

  onChange(event){
      this.file = (event.target as HTMLInputElement).files[0];
      this.uploadForm.patchValue({
        avatar: this.file
      });

      this.uploadForm.get('avatar').updateValueAndValidity()


      //File Preview

      const reader =new FileReader();
      reader.onload = ()=>{
        this.imageURL= reader.result as string;
      }
      reader.readAsDataURL(this.file)
    }
}
