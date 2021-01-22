import { Component, OnInit } from '@angular/core';
import { DataService } from 'src/services/data.service';
import { DirectoryService } from '../../../services/directory.service';
import { Router } from '@angular/router';
import { SharedResourceService } from 'src/services/shared-resource.service';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss']
})
export class SearchComponent implements OnInit {
  items=['text', 'yele', 'yawa','qwerty','yaw'];
  fontIcon = "fa fa-folder";
  archives:any=[];
  searchedResults:any=[];
  searchParameter:string="";
  resources:any;
  currentUser:string="";
  showTooltip: any= 1;
  requestModal: any;
  Receivedata: any;
  delfolder: boolean;
  message: string;

  constructor(private data: DataService, private volatileInfo: DataService,private directoryManager:DirectoryService,private router:Router, private resourceManager:SharedResourceService,private directory: DirectoryService ) {
    // get user shared resources
    this.resources = this.resourceManager.getMyResources(this.data.getActiveUser().email,data.getEntity());
  }

  ngOnInit(): void {
    // get search text
    this.volatileInfo.searchItem.subscribe(searchParam=>{
      console.log(searchParam);
      if(searchParam){
        this.directoryManager.getAccessibleArchives(this.volatileInfo.getActiveUser().accessList,this.volatileInfo.getEntity()).subscribe(result=>{
          this.archives=[];
          console.log(result," THIS IS THE ACCESS LIST");
          result.forEach(doc=>{
            if (doc.alias.toLowerCase().includes(searchParam.toLowerCase())){
              this.archives.push(doc);
            }
          })
          // this.archives = result;
          console.log("this is the searched archives",this.archives);
        });
      }else{
        this.archives=[];
      }
    });
  }

  onSelected(directory){
  //the search item
  if(directory.itemType=='folder'){
    this.directoryManager._getSubDirectoryContent(directory.id,this.volatileInfo.getEntity()).subscribe(result=>this.archives = result);
    // this.volatileInfo.setCurrentDirectory(directory.id,directory.name);

    console.log("directory is set",this.archives);
    // this.router.navigate(["home", "content",thithis.currentSectionName, directory.id, directory.name])
  }else{
    return;
  }

 }

 sendFileToResource(item,resource){
  this.resourceManager.AddFileToResource(item,resource,this.data.getEntity());
  this.showTooltip= +!this.showTooltip;

 }

 onShowRequest(item,i,event){
  this.showTooltip= +!this.showTooltip;

  event.stopPropagation();
  this.requestModal = !this.requestModal;

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

 onRequestModal(value){
  this.showTooltip = +true;
  this.requestModal = value;

}
}
