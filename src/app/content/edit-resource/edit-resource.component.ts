import { formatDate } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { Resource } from 'src/app/models/resources.model';
import { AdminResourceService } from 'src/app/services/AdminResource.service';

@Component({
  selector: 'app-edit-resource',
  templateUrl: './edit-resource.component.html',
  styleUrls: ['./edit-resource.component.scss']
})
export class EditResourceComponent implements OnInit {
 EditResource: FormGroup= new FormGroup({
  Name: new FormControl(null),
  date: new FormControl(null)
 });

 Name: string;
 index: any;
 date: string;


  constructor( private adminresource: AdminResourceService, private route: Router) { }

  ngOnInit(): void {
      this.adminresource.EditResource
      .subscribe((item:{details: any,position: any}) =>{
        this.Name= item.details.Name,
        this.index = item.position;
        this.date = item.details.date;


        this.EditResource.setValue({
          "Name": this.Name ?? "",
          "date" : this.date?? " ",
        })
      }

      );

  }


  onEdit(){
    this.adminresource.UpdateResource(this.EditResource.value,this.index);
    //console.log(this.EditResource.value);
    this.route.navigate(['home/content/SharedResources'])
  }
}
