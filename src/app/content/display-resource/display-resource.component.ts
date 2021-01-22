import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
//import { Console } from 'console';
import { AdminResourceService } from 'src/services/AdminResource.service';
import { SectionService } from 'src/services/section.service';
import { DataService } from 'src/services/data.service';
import { DirectoryService } from 'src/services/directory.service';
import { SharedResourceService } from '../../../services/shared-resource.service';

@Component({
  selector: 'app-display-resource',
  templateUrl: './display-resource.component.html',
  styleUrls: ['./display-resource.component.scss']
})
export class DisplayResourceComponent implements OnInit {

  entity:string;
  CurrentUser:string;
  ResourceName: string;
  ResourceId:string;
  ResourceOwner:string;
  fontIcon = "fa fa-folder";
  filesItemIds:[];
  files:any =[];
  showTooltip: any =1
  constructor(private resourceManager:SharedResourceService,private directoryManager:DirectoryService, userVolatileData:DataService, private adminresource: AdminResourceService, private section: SectionService, private route: Router )
  {
    this.adminresource.EditResource.
    subscribe((item: {details:any})=>{
      console.log("external item", item.details.objects);
      this.ResourceName=item.details.name
      this.ResourceId = item.details.id;
      this.filesItemIds = item.details.objects;
      this.ResourceOwner = item.details.owner;
      console.log("this resource name ",this.ResourceName);
      if (this.filesItemIds.length>0){
        console.log("inside if ")
        directoryManager.getFileList(this.filesItemIds,userVolatileData.getEntity()).subscribe(result=>{
          this.files = result;
          console.log("result if ",result)
        });
      }
      
    });

    this.CurrentUser = userVolatileData.getActiveUser().email;
  }

  async getResource(id){
    await this.resourceManager.GetResource(id, this.entity).subscribe(result=>{
      let resource = result.data();
      this.filesItemIds = result.data().objects;
    });
  }

  ngOnInit(): void {

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
