import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { LoaderService } from 'src/interceptors/loader.service';
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
  constructor(private data:DataService,private directory:DirectoryService, public fb: FormBuilder,
    private loaderService:LoaderService
    ) {
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
      try {
        
        this.loaderService.setHttpProgressStatus(true);
        let res = await this.directory.uploadFile(this.file,this.data.getActiveUser().email,this.data.getCurrentSection(),this.data.getCurrentDirectory(),this.data.getEntity());
        this.loaderService.setHttpProgressStatus(false);
        console.log(res,"response from upload");
        //this.onBack;
        this.onResult.emit(value);
      } catch (error) {

        console.error("Catchingggg",error);
        this.loaderService.setHttpProgressStatus(false);
      }
     
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
