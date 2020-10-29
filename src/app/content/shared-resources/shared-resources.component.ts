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

  constructor( private adminresource: AdminResourceService ,private route: Router,private resourceManager:SharedResourceService,private volatileData:DataService) {
    this.resources = this.resourceManager.getMyResources(this.volatileData.getActiveUser().email);
    
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

  onSelected(user, i){
    console.log(user.Name, i);
    // this.adminresource.onEditResource(user,i);
    //this.route.navigate(["/home/content/SharedResources", i, user.Name]);
  }
}
