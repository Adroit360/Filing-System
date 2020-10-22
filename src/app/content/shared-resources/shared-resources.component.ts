import { Component, OnInit, Output } from '@angular/core';
import {  Router } from '@angular/router';
import { Resource } from 'src/app/models/resources.model';
import { AdminResourceService } from 'src/app/services/AdminResource.service';

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
  constructor( private adminresource: AdminResourceService ,private route: Router) { }

  ngOnInit(): void {
    this.NewResource=this.adminresource.getAllResources();
  }

  onDeleteGroup(item:any){
    this.message="Are you sure you want to delete Resource?"
    this.modalState= true;
    this.resource=item;

  }

  onModalResult(result: boolean){
    if (result){
      this.adminresource.onDeleteuserGroups(this.resource);
    this.NewResource=this.adminresource.getAllResources();
    this.modalState=false;
    }

    else{
      this.modalState=false;
    }
  }

  onAdd(){
    this.route.navigate(['/home/content/CreateResource']);
  }

  onEdit(item:any, index: any){
    this.route.navigate(["/home/content/EditResource"]);
    this.adminresource.onEditResource(item, index);
  }

  onSelected(user, i){
    console.log(user.Name, i);
  }
}
