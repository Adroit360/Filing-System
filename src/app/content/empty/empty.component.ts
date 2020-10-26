import { ActivatedRoute, Router } from '@angular/router';
// import { SectionService } from 'src/app/services/section.service';
import { Component, OnInit } from '@angular/core';
import { DirectoryService } from '../../services/directory.service';
import { DataService } from '../../services/data.service';

@Component({
  selector: 'app-empty',
  templateUrl: './empty.component.html',
  styleUrls: ['./empty.component.scss']
})
export class EmptyComponent implements OnInit {
  //  holds the folders of the various departments you will load everything in the service
  // departments: any[] = this.sectionService.departments;

  // alternate array to load the files from the server when a user clicks on a folder
  // department_files = this.sectionService.department_files;
  title = "";
  heading: string;
  fontIcon = "fa fa-folder";
  department;
  currentSectionId:string="";
  currentSectionName:string="";
  currentDirectoryId:string="";
  currentDirectoryName:string="";
  currentName;
  dirContent: any;
  createfolder = false;
  addfile = false;
  hierrachy:any=[];
  currentBreadCrump;

  constructor(private data: DataService,
    private activatedRoute: ActivatedRoute, private router: Router, private directory: DirectoryService) {

    // this.dirContent = this.directory.getActiveDirectoryItems();
    // console.log("here we are",this.dirContent);
    // this.hierrachy = this.data.getDirectoryHierrachy();

    // this.activatedRoute.queryParams.subscribe(qParams => {
    //   let name = qParams.name;
    //   console.log("qparam", qParams);
    //   if (name) {
    //     this.resetBreadCrumpOnSameLevel();
    //     this.currentBreadCrump += ` > ${name}`;
    //     this.routeChanged(name);
    //   } else {
    //     console.log("FAlsy Name");
    //     this.computeRoute();
    //   }


    // });

    this.activatedRoute.paramMap.subscribe(param => {

      //var hasQueryParams = this.activatedRoute.snapshot.queryParams.name;
      console.log("param", param);

      this.currentSectionId = param.get("sectionId");
      this.currentSectionName = param.get("sectionName");
      this.currentDirectoryId = param.get("directoryId");
      this.currentDirectoryName = param.get("directoryName");

      console.log(this.currentSectionName, "from empty");
      this.computeRoute();
    });
  
  }

  computeRoute() {
    let name = this.department;
    this.dirContent = this.directory.getSubDirectoryContent(this.currentSectionId, this.currentDirectoryId);

    console.log("directory content", this.dirContent);
    this.currentName = name;
    if(this.hierrachy.includes(name)){
      this.hierrachy = this.hierrachy.splice(0,this.hierrachy.indexOf(name)+1);
    }else{
      this.hierrachy.push(name);
    }
    
    this.currentBreadCrump = ` > ${name}`;
    this.routeChanged(name);
  }


  ngOnInit(): void {

  }

  onFolderClicked(directory) {
    // this.data.setCurrentDirectory(item.id, item.name);
    this.dirContent = this.directory.getSubDirectoryContent(this.currentSectionId, directory.id);
    this.data.setCurrentDirectory(directory.id, directory.name);
    //this.hierrachy.push(item.name);
    console.log(this.hierrachy,"this is the hierrachy");
    this.router.navigate(["home", "content",this.currentSectionId,this.currentSectionName, directory.id, directory.name])
  }

  routeChanged(item: string) {
    // if we are on the general page
    console.log(item);
    if (item == 'general') {
      // this.departments = this.sectionService.departments
    }
    else {
      // this.departments = []; // clear the folder
      //  load the files from the server based on the department the user clicked on
      // this.departments = this.department_files;  
    }
    this.title = this.currentBreadCrump; // updates the title
  }

  resetBreadCrumpOnSameLevel() {
    // this.currentBreadCrump = ` > ${this.currentName}`;
  }

  newfolder() {
    this.createfolder = !this.createfolder;
  }

  onModalResult(result: boolean) {
    console.log(result);
    this.createfolder = result;

  }

  Addfile() {
    this.addfile = !this.addfile;
  }

  onPreviewResult(result: boolean){
    this.addfile=result;
    console.log(result)
  }
}
