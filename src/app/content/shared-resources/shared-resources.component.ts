import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import {  Router } from '@angular/router';
import { Resource } from 'src/app/models/resources.model';
import { AdminResourceService } from 'src/app/services/AdminResource.service';
import { SharedResourceService } from '../../services/shared-resource.service';
import { DataService } from '../../services/data.service';

@Component({
  selector: 'app-shared-resources',
  templateUrl: './shared-resources.component.html',
  styleUrls: ['./shared-resources.component.scss']
})
export class SharedResourcesComponent implements OnInit {
  NewResource: Resource[]=[];
  @Output() message: string;
  delete: boolean;
  modalState: boolean;
  today: number= Date.now();
  resource: any;
  resources:any;
 externalResources:[];

  dummyResource = [
    {name: 'beans', date: '10-22-1998'}, {name: 'beans', date: '10-22-1998'}, {name: 'beans', date: '10-22-1998'},
    {name: 'beans', date: '10-22-1998'}, {name: 'beans', date: '10-22-1998'}, {name: 'beans', date: '10-22-1998'},
    {name: 'beans', date: '10-22-1998'}, {name: 'beans', date: '10-22-1998'}, {name: 'beans', date: '10-22-1998'},

  ]
  constructor( private adminresource: AdminResourceService ,private route: Router,private resourceManager:SharedResourceService,private volatileData:DataService) {
    this.resources = this.resourceManager.getMyResources(this.volatileData.getActiveUser().email);
     this.resourceManager.getMyExternalResources(this.volatileData.getActiveUser().email).subscribe(result=>{
       this.externalResources = result[0].sharedResources;
       console.log("my external resource", this.externalResources);
     });

    // this.externalResources = this.volatileData.getActiveUser().sharedResources;


  }

  ngOnInit(): void {
    this.NewResource=this.adminresource.getAllResources();
  }

  onDeleteGroup(item:any,event){
    this.message="Are you sure you want to delete Resource?"
    this.modalState= true;
    this.resource=item;

    event.stopPropagation();
  }

  onModalResult(result: boolean){
    if (result){
      // this.adminresource.onDeleteuserGroups(this.resource);
      // this.NewResource=this.adminresource.getAllResources();
      console.log('item to be removed',this.resource);
      this.resourceManager.RemoveResource(this.resource);
      this.modalState=false;
    }

    else{
      this.modalState=false;
    }
  }

  onAdd(){
    this.route.navigate(['/home/content/CreateResource']);
  }

  onEdit(resource:any){
    this.route.navigate(["/home/content/EditResource"]);
    this.adminresource.onEditResource(resource);
  }

  onSelected(resource:any){
    this.adminresource.onEditResource(resource);
    //console.log(user.Name, i);
    // this.adminresource.onEditResource(user,i);
    //this.route.navigate(["/home/content/SharedResources", i, user.Name]);
  }

  async getResource(id){
    await this.resourceManager.GetResource(id).subscribe(result=>{
      let resource = result.data();
      console.log("resource for external",resource);
      this.adminresource.onEditResource(resource);
    });
  }
}
