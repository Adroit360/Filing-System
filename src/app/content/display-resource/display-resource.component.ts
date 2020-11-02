import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
//import { Console } from 'console';
import { AdminResourceService } from 'src/app/services/AdminResource.service';
import { SectionService } from 'src/app/services/section.service';

@Component({
  selector: 'app-display-resource',
  templateUrl: './display-resource.component.html',
  styleUrls: ['./display-resource.component.scss']
})
export class DisplayResourceComponent implements OnInit {

  ResourceName: string;
  fontIcon = "fa fa-folder";
  files = [{name: 'maketting'},{name: 'maketting'},{name: 'maketting'},{name: 'maketting'},
  {name: 'maketting'},{name: 'maketting'},{name: 'maketting'},{name: 'maketting'},
  {name: 'maketting'},{name: 'maketting'},{name: 'maketting'},{name: 'maketting'},
  {name: 'maketting'},{name: 'maketting'},{name: 'maketting'},{name: 'maketting'},
  {name: 'maketting'},{name: 'maketting'},{name: 'maketting'},{name: 'maketting'},
  {name: 'maketting'},{name: 'maketting'},{name: 'maketting'},{name: 'maketting'},
  {name: 'maketting'},{name: 'maketting'},{name: 'maketting'},{name: 'maketting'},
  {name: 'maketting'},{name: 'maketting'},{name: 'maketting'},{name: 'maketting'},
  {name: 'maketting'},{name: 'maketting'},{name: 'maketting'},{name: 'maketting'},
  {name: 'maketting'},{name: 'maketting'},{name: 'maketting'},{name: 'maketting'},
  {name: 'maketting'},{name: 'maketting'},{name: 'maketting'},{name: 'maketting'},
  {name: 'maketting'},{name: 'maketting'},{name: 'maketting'},{name: 'maketting'},
  {name: 'maketting'},{name: 'maketting'},{name: 'maketting'},{name: 'maketting'},
]
  constructor(private adminresource: AdminResourceService, private section: SectionService, private route: Router ) { }

  ngOnInit(): void {
    this.adminresource.EditResource.
    subscribe((item: {details:any,postion:any})=>{
      this.ResourceName=item.details.name

      //console.log(this.ResourceName);
    })


    //this.files = this.section.department_files.map(i=>true)
  }


AddUser(){
  this.route.navigate(['home/content/userlists']);
}

}
