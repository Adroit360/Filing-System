import { Component, OnInit } from '@angular/core';
//import { Console } from 'console';
import { AdminResourceService } from 'src/app/services/AdminResource.service';
import { SectionService } from 'src/app/services/Section.service';

@Component({
  selector: 'app-display-resource',
  templateUrl: './display-resource.component.html',
  styleUrls: ['./display-resource.component.scss']
})
export class DisplayResourceComponent implements OnInit {

  ResourceName: string;
  fontIcon = "fa fa-folder";
  constructor(private adminresource: AdminResourceService, private section: SectionService ) { }

  ngOnInit(): void {
    this.adminresource.EditResource.
    subscribe((item: {details:any,postion:any})=>{
      this.ResourceName=item.details.Name

      //console.log(this.ResourceName);
    })


    //this.files = this.section.department_files.map(i=>true)
  }


AddUser(){
console.log("i have added you");
}

}
