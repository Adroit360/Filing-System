import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
//import { Console } from 'console';
import { AdminResourceService } from 'src/app/services/AdminResource.service';
import { SectionService } from 'src/app/services/section.service';
import { DataService } from 'src/app/services/data.service';
import { DirectoryService } from 'src/app/services/directory.service';

@Component({
  selector: 'app-display-resource',
  templateUrl: './display-resource.component.html',
  styleUrls: ['./display-resource.component.scss']
})
export class DisplayResourceComponent implements OnInit {

  CurrentUser:string;
  ResourceName: string;
  ResourceId:string;
  ResourceOwner:string;
  fontIcon = "fa fa-folder";
  filesItemIds:[];
  files:any =[];
  showTooltip: any =1
  constructor(private directoryManager:DirectoryService, userVolatileData:DataService, private adminresource: AdminResourceService, private section: SectionService, private route: Router )
  {
    this.adminresource.EditResource.
    subscribe((item: {details:any})=>{
      console.log("external item", item.details.objects);
      this.ResourceName=item.details.name
      this.ResourceId = item.details.id;
      this.filesItemIds = item.details.objects;
      this.ResourceOwner = item.details.owner;
      console.log("this resource name ",this.ResourceName);
      //  this.resources = this.resourceManager.getResourceObjects(this.ResourceId);
      // console.log("this are the content of " ,this.resources);
    });

    if (this.filesItemIds.length>0){
      directoryManager.getFileList(this.filesItemIds,userVolatileData.getEntity()).subscribe(result=>{
        this.files = result;

      });
    }

    this.CurrentUser = userVolatileData.getActiveUser().email;


  }

  ngOnInit(): void {



    //this.files = this.section.department_files.map(i=>true)
  }


AddUser(){
  this.route.navigate(['home/content/userlists']);
}
onDelete(){

}
onBack(){
  this.route.navigate(['home/content/SharedResources']);
}

}
