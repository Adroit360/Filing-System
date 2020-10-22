
import { formatDate } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AdminResourceService } from 'src/app/services/AdminResource.service';


@Component({
  selector: 'app-new-resource',
  templateUrl: './new-resource.component.html',
  styleUrls: ['./new-resource.component.scss']
})
export class NewResourceComponent implements OnInit {
  newResource: FormGroup;
  today= new Date();
  cValue = formatDate(this.today, 'yyyy-MM-dd',"en-US'");

  constructor( private resource: AdminResourceService, private route: Router) {

   }

  ngOnInit(): void {
    this.newResource= new FormGroup({
      newresource: new FormControl(null, Validators.required)
    });
  }


  onCreate(){
    this.resource.addResource({
      Name: this.newResource.value.newresource,
      date: this.cValue,
    });

    this.route.navigate(['home/content/SharedResources'])
  }

}
