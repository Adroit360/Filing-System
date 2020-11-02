import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
//import { Console } from 'console';
import { AdminResourceService } from 'src/app/services/AdminResource.service';
import { SectionService } from 'src/app/services/section.service';
import { SharedResourceService } from 'src/app/services/shared-resource.service';

@Component({
  selector: 'app-display-resource',
  templateUrl: './display-resource.component.html',
  styleUrls: ['./display-resource.component.scss']
})
export class DisplayResourceComponent implements OnInit {

  ResourceName: string;
  ResourceId:string;
  fontIcon = "fa fa-folder";
  resources:[];
  constructor(private resourceManager:SharedResourceService, private adminresource: AdminResourceService, private section: SectionService, private route: Router ) 
  {
    this.adminresource.EditResource.
    subscribe((item: {details:any})=>{
      this.ResourceName=item.details.name
      this.ResourceId = item.details.id;
      this.resources = item.details.objects;
      console.log("this resource name ",this.ResourceName);
      // this.resources = this.resourceManager.getResourceObjects(this.ResourceId);
      console.log("this are the content of " ,item.details.objects);
    })
  }

  ngOnInit(): void {
    


    //this.files = this.section.department_files.map(i=>true)
  }


AddUser(){
  this.route.navigate(['home/content/userlists']);
}

}
