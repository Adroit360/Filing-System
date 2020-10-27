import { ActivatedRoute, Router } from '@angular/router';
import { SectionService } from 'src/app/services/Section.service';
import { Component, OnInit } from '@angular/core';
import { AdminResourceService } from 'src/app/services/AdminResource.service';
import { Resource } from 'src/app/models/resources.model';

@Component({
  selector: 'app-empty',
  templateUrl: './empty.component.html',
  styleUrls: ['./empty.component.scss']
})
export class EmptyComponent implements OnInit {
//  holds the folders of the various departments you will load everything in the service
departments: any[] = this.sectionService.departments;

// alternate array to load the files from the server when a user clicks on a folder
department_files = this.sectionService.department_files;
title="";
heading: string;
fontIcon = "fa fa-folder";
department;
currentIndex;
currentName;
createfolder=false;
addfile=false;
NewResource: Resource[]=[];

currentBreadCrump;
  constructor(private  sectionService: SectionService,
    private activatedRoute:ActivatedRoute,private router:Router, private adminresource: AdminResourceService) {



      this.activatedRoute.queryParams.subscribe(qParams=>{
        let name = qParams.name;
        if(name){
          this.resetBreadCrumpOnSameLevel();
          this.currentBreadCrump += ` > ${name}`;
          this.routeChanged(name);
        }
      });

      this.activatedRoute.paramMap.subscribe(param=>{

        var hasQueryParams = this.activatedRoute.snapshot.queryParams.name;

        let name = param.get("name");
        this.department = name;

        this.currentIndex = param.get("id");
        this.currentName = name;

        this.currentBreadCrump = ` > ${name}`;
        this.routeChanged(name);
      });
   }

  ngOnInit(): void {
    this.NewResource=this.adminresource.getAllResources();
  }

  onFolderClicked(item, event){
    // navigate to another route
    event.stopPropagation();
    this.router.navigate(["home","content",this.currentIndex,this.currentName],{
      queryParams:{
        name:item

      },
      // fragment: ''
      // queryParamsHandling: 'preserve'

    }
    )

  }

  routeChanged(item: string){
    // if we are on the general page
    console.log(item);
    if(item =='General'){
      this.departments = this.sectionService.departments
    }
    else{
      this.departments = []; // clear the folder
      //  load the files from the server based on the department the user clicked on
      this.departments = this.department_files;
    }
    this.title = this.currentBreadCrump; // updates the title
  }

  resetBreadCrumpOnSameLevel(){
    this.currentBreadCrump = ` > ${this.currentName}`;
  }

  newfolder(){
    this.createfolder=!this.createfolder;
     }

 onModalResult (result: boolean){
       console.log(result);
       this.createfolder= result;

     }

  Addfile(){
    this.addfile = !this.addfile;
  }

  onPreviewResult(result: boolean){
    this.addfile=result;
    console.log(result)
  }


  onShare(){
    console.log("We've been clicked")
  }

  onDownload(){
    console.log("downloading...");
  }

  onDelete(){
    console.log("deleted")
  }
}
