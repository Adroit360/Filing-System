import { ActivatedRoute, Router } from '@angular/router';
// import { SectionService } from 'src/app/services/section.service';
import { Component, OnInit } from '@angular/core';
import { DirectoryService } from '../../../services/directory.service';
import { DataService } from '../../../services/data.service';
import { SharedResourceService } from '../../../services/shared-resource.service';
import { AdminResourceService } from 'src/services/AdminResource.service';
import { Resource } from 'src/app/models/resources.model';
import { ApprovalService } from 'src/services/approval.service';

@Component({
  selector: 'app-empty',
  templateUrl: './empty.component.html',
  styleUrls: ['./empty.component.scss']
})
export class EmptyComponent implements OnInit {

  title = "";
  heading: string;
  Receivedata;
  fontIcon = "fa fa-folder";
  department;
  entityId:string;
  currentSectionId:string="";
  currentSectionName:string="";
  currentDirectoryId:string="";
  currentDirectoryName:string="";
  currentName;
  dirContent: any;
  createfolder = false;
  addfile = false;
  delfolder= false;
  hierrachy:any=[];
  currentBreadCrump;
  NewResource:any;
  currentUser:string="";
  resources:any;
  requestModal = false; // turns on the request approval component
  showTooltip: any= 1;
  message:string;

  constructor(private data: DataService,private adminResource:AdminResourceService,private resourceManager:SharedResourceService,
    private activatedRoute: ActivatedRoute, private router: Router, private directory: DirectoryService, private approve: ApprovalService) {
    // get current user information
      this.currentUser = data.getActiveUser().email;

    // get user shared resources
     this.resources = this.resourceManager.getMyResources(this.currentUser,data.getEntity());
    // console.log("resources form ",this.resources);
    this.activatedRoute.paramMap.subscribe(param => {

      this.currentSectionId = param.get("sectionId");
      this.currentSectionName = param.get("sectionName");
      this.currentDirectoryId = param.get("directoryId");
      this.currentDirectoryName = param.get("directory");
      this.entityId = param.get("entityId");

      this.computeRoute();
    });

  }

  computeRoute() {

    this.dirContent = this.directory.getSubDirectoryContent(this.currentSectionId, this.currentDirectoryId,this.entityId);

    // console.log("directory content", this.dirContent);
    // this.currentName = name;
    // if(this.hierrachy.includes(name)){
    //   this.hierrachy = this.hierrachy.splice(0,this.hierrachy.indexOf(name)+1);
    // }else{
    //   this.hierrachy.push(name);
    // }

    // this.currentBreadCrump = ` > ${name}`;
    // this.routeChanged(name);
  }


  ngOnInit(): void {
    this.NewResource=this.adminResource.getAllResources();

  }

  onFolderClicked(directory) {
    // this.data.setCurrentDirectory(item.id, item.name);
    if(directory.itemType=='folder'){
      this.dirContent = this.directory.getSubDirectoryContent(this.currentSectionId, directory.id,this.data.getEntity());
      this.data.setCurrentDirectory(directory.id,directory.name);
      this.directory.recentFolders(this.data.getActiveUser().email,directory,this.data.getEntity(),this.data.getFirstRecentFolder(),this.data.getCurrentRecentFolderLength());
      console.log("directory is set");
      this.router.navigate(["home", "content",this.data.getEntity(),this.currentSectionId,this.currentSectionName, directory.id, directory.name])
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

  onDelete(item){
    this.Receivedata=item;
    // console.log("deleted");

    if (item.itemType=="file"){
      this.delfolder=!this.delfolder;
      this.message='Are you sure you want to delete file?';
      // this.directory.deleteFile(item.id,item.alias,this.data.getEntity());
    }
    else if (item.itemType=="folder"){
      this.delfolder=!this.delfolder;
      this.message='Are you sure you want to delete Folder?';
      // this.directory.deleteDirectory(item.id,this.data.getEntity());
    }
  }

  onModalDelete(result:boolean){
    if(result){
       if(this.Receivedata.itemType="file"){
         console.log(result)
       this.directory.deleteFile(this.Receivedata.id,this.Receivedata.alias,this.data.getEntity());
       this.delfolder=false;
       }
       else if(this.Receivedata.itemType="folder"){
        this.directory.deleteDirectory(this.Receivedata.id,this.data.getEntity());
        this.delfolder=false;
       }
    }

    else{
      this.delfolder=false;
    }

  }

  onSelected(list, event ,index, item){
    event.stopPropagation();
    //console.log(list.Name);
    event.target.closest(".smart-tooltip").blur();
    //this.router.navigate(['home/content/SharedResources', index, list.Name ]);
    //this.fontIcon;
    console.log(item);

  }
  // displays the modal
  onShowRequest(item , i, event){
    this.showTooltip= +!this.showTooltip;

    event.stopPropagation();
    this.requestModal = !this.requestModal;
    this.approve.requestapprove(i,item);

  }



  sendFileToResource(item,resource){
    // console.log("resource clicked");
    this.resourceManager.AddFileToResource(item,resource,this.data.getEntity());
    this.showTooltip= +!this.showTooltip;
  }
  onRequestModal(value){
    this.showTooltip = +true;
    this.requestModal = value;

  }

  selectedResource(item, event){
    //event.stopPropagation();
    console.log(item);

  }

  async Back(){
    console.log("back clicked")
    let parent = await this.directory.getParent(this.data.currentDirectory,this.data.getEntity());

    if(parent){
      // this.dirContent = await this.directory._getSubDirectoryContent(parent.id,this.data.getEntity());
      await this.data.setCurrentDirectory(parent.id,parent.name);
      this.router.navigate(["home", "content",this.data.getEntity(),this.currentSectionId,this.currentSectionName, parent.id, parent.name])
    }
  }
}

