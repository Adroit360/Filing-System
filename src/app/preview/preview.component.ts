import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
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
  private currentSectionID: string;
  private currentDirectory: string;
  fileName: any;
  fileboolean: boolean = false;
  loading: boolean = false;
  // progress bar value
  progessValue: number= 0;

  constructor(private data:DataService,private directory:DirectoryService, public fb: FormBuilder,
     private activatedroute:ActivatedRoute,
     private loaderService: LoaderService) {
    //Reactive Form
    this.uploadForm= this.fb.group({
      avatar: [null],
      name: ['']
    })
    directory.progressBarValue.subscribe(res => {
      this.progessValue = res ;
      console.log("Progess: ", this.progessValue);

    })
   }

  ngOnInit(): void {
  }
  ngOnDestroy(): void {
    //Called once, before the instance is destroyed.
    //Add 'implements OnDestroy' to the class.
   // this.directory.progressBarValue.unsubscribe();

  }

  onBack(value:boolean){

    this.onResult.emit(value);
    console.log('onBack',value);

    }

    async onUpload(value: boolean){
      // this.loaderService.setHttpProgressStatus(true);
      // if(value==true){
      //   this.loading = true;
      // }
      
      this.activatedroute.params.subscribe((params)=>{
        console.log("this is the route parameters",params);
        this.currentSectionID = params["sectionId"];
        this.currentDirectory = params["directoryId"];
        console.log("sectionID: ", this.currentSectionID);
        console.log("directoryID: ", this.currentDirectory);
      });
      try {
        let res:any = await this.directory.uploadFile(this.file,this.data.getActiveUser().email,this.currentSectionID,this.currentDirectory,this.data.getEntity())

        console.log(res,"response from upload");
        // this.loaderService.setHttpProgressStatus(false);
        //this.onBack;
        if(this.progessValue==100){
          this.loading = false;
        }
        else{
          this.loading = true;
        }
        this.onResult.emit(value);

      } catch (error) {
        this.loaderService.setHttpProgressStatus(false);
      }

    }

  onChange(event){
     this.fileboolean = true;
      this.file = (event.target as HTMLInputElement).files[0];
      this.fileName = this.file;
      this.fileName = this.fileName.name;
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
