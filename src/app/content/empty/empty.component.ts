import { ActivatedRoute, Router } from '@angular/router';
import { SectionService } from 'src/app/services/Section.service';
import { Component, OnInit } from '@angular/core';

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
fontIcon = "fa fa-folder";
department;
currentIndex;
currentName;

currentBreadCrump;
  constructor(private  sectionService: SectionService,
    private activatedRoute:ActivatedRoute,private router:Router) {

      

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
    
  }

  onFolderClicked(item){
    // navigate to another route
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
    if(item =='general'){
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
}
