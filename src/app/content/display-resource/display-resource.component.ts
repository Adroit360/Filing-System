import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
//import { Console } from 'console';
import { AdminResourceService } from 'src/app/services/AdminResource.service';
import { SectionService } from 'src/app/services/section.service';
import { SharedResourceService } from 'src/app/services/shared-resource.service';
import { DirectoryService } from 'src/app/services/directory.service';

@Component({
  selector: 'app-display-resource',
  templateUrl: './display-resource.component.html',
  styleUrls: ['./display-resource.component.scss']
})
export class DisplayResourceComponent implements OnInit {

  ResourceName: string;
  ResourceId:string;
  fontIcon = "fa fa-folder";
  filesItemIds:[];
  files:any =[];
  showTooltip: any= 1;
  constructor(private directoryManager:DirectoryService, private resourceManager:SharedResourceService, private adminresource: AdminResourceService, private section: SectionService, private route: Router )
  {
    this.adminresource.EditResource.
    subscribe((item: {details:any})=>{
      this.ResourceName=item.details.name
      this.ResourceId = item.details.id;
      this.filesItemIds = item.details.objects;
      console.log("this resource name ",this.ResourceName);
      // this.resources = this.resourceManager.getResourceObjects(this.ResourceId);
      // console.log("this are the content of " ,this.resources);
    });

    directoryManager.getFileList(this.filesItemIds).subscribe(result=>{
        this.files = result;
        console.log("this are the content of files " ,this.files);
    })

  }

  ngOnInit(): void {



    //this.files = this.section.department_files.map(i=>true)
  }


AddUser(){
  this.route.navigate(['home/content/userlists']);
}
onDelete(){

}

}
