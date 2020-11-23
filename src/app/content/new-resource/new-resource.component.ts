
import { formatDate } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AdminResourceService } from 'src/app/services/AdminResource.service';
import { SharedResourceService } from '../../services/shared-resource.service';
import { DataService } from '../../services/data.service';

@Component({
  selector: 'app-new-resource',
  templateUrl: './new-resource.component.html',
  styleUrls: ['./new-resource.component.scss']
})
export class NewResourceComponent implements OnInit {
  newResource: FormGroup;
  today= new Date();
  cValue = formatDate(this.today, 'yyyy-MM-dd',"en-US'");

  constructor( private resource: AdminResourceService, private route: Router,private resourceManager:SharedResourceService,private volatileData:DataService) {

   }

  ngOnInit(): void {
    this.newResource= new FormGroup({
      newresource: new FormControl(null, Validators.required)
    });
  }


  async onCreate(){
    // this.resource.addResource({
    //   Name: this.newResource.value.newresource,
    //   date: this.cValue,
    // });
    await this.resourceManager.createResource(this.newResource.value.newresource,this.volatileData.getActiveUser().email,this.volatileData.getEntity());
    this.route.navigate(['home/content/SharedResources']);
  }

  onCancel(){
    this.route.navigate(['home/content/SharedResources']);
  }

}
