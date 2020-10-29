import { ActivatedRoute, Router } from '@angular/router';
// import { SectionService } from 'src/app/services/section.service';
import { Component, OnInit } from '@angular/core';
import { DirectoryService } from '../../services/directory.service';
import { DataService } from '../../services/data.service';
import { AdminResourceService } from 'src/app/services/AdminResource.service';
import { Resource } from 'src/app/models/resources.model';

@Component({
  selector: 'app-empty',
  templateUrl: './empty.component.html',
  styleUrls: ['./empty.component.scss']
})
export class EmptyComponent implements OnInit {

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
  NewResource:any;

  constructor(private data: DataService,private adminResource:AdminResourceService,
    private activatedRoute: ActivatedRoute, private router: Router, private directory: DirectoryService) {

    this.activatedRoute.paramMap.subscribe(param => {

      //var hasQueryParams = this.activatedRoute.snapshot.queryParams.name;
      // console.log("param", param);

      this.currentSectionId = param.get("sectionId");
      this.currentSectionName = param.get("sectionName");
      this.currentDirectoryId = param.get("directoryId");
      this.currentDirectoryName = param.get("directory");
      console.log("current directory name",this.currentDirectoryName);

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
    this.NewResource=this.adminResource.getAllResources();
  }

  onFolderClicked(directory) {
    // this.data.setCurrentDirectory(item.id, item.name);
    if(directory.itemType=='folder'){
      this.dirContent = this.directory.getSubDirectoryContent(this.currentSectionId, directory.id);
      this.data.setCurrentDirectory(directory.id, directory.name);
      console.log(this.hierrachy,"this is the hierrachy");
      this.router.navigate(["home", "content",this.currentSectionId,this.currentSectionName, directory.id, directory.name])
    }else{
      return;
    }

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


  onDownload(){
    console.log("downloading...");
  }

  onDelete(){
    console.log("deleted")
  }

  onSelected(list, event ,index, item){
    event.stopPropagation();
    //console.log(list.Name);
    event.target.closest(".smart-tooltip").blur();
    //this.router.navigate(['home/content/SharedResources', index, list.Name ]);
    //this.fontIcon;
    console.log(item);

  }


}
