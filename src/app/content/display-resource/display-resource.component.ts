import { Component, OnInit } from '@angular/core';
//import { Console } from 'console';
import { AdminResourceService } from 'src/app/services/AdminResource.service';

@Component({
  selector: 'app-display-resource',
  templateUrl: './display-resource.component.html',
  styleUrls: ['./display-resource.component.scss']
})
export class DisplayResourceComponent implements OnInit {

  ResourceName: string;
  constructor(private adminresource: AdminResourceService) { }

  ngOnInit(): void {
    this.adminresource.EditResource.
    subscribe((item: {details:any,postion:any})=>{
      this.ResourceName=item.details.Name

      //console.log(this.ResourceName);
    })
  }


AddUser(){
console.log("i have added you");
}

}
