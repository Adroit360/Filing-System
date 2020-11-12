import { Component, OnInit } from '@angular/core';
import { DataService } from 'src/app/services/data.service';
import { DirectoryService } from '../../services/directory.service';
import { Router } from '@angular/router';

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
  constructor( private volatileInfo: DataService,private directoryManager:DirectoryService,private router:Router) { }

  ngOnInit(): void {
    // get search text
    this.volatileInfo.searchItem.subscribe(searchParam=>{
      console.log(searchParam);
      if(searchParam){
        this.directoryManager.getAccessibleArchives(this.volatileInfo.getActiveUser().accessList).subscribe(result=>{
          this.archives=[];
          result.forEach(doc=>{
            if (doc.alias.toLowerCase().includes(searchParam.toLowerCase())){
              this.archives.push(doc);
            }
          })
          // this.archives = result;
            console.log("this is the searched archives",this.archives);
        });
      }
      
    });
    
   

    
  }

  onSelected(directory){
  //the search item
  if(directory.itemType=='folder'){
    this.directoryManager._getSubDirectoryContent(directory.id).subscribe(result=>this.archives = result);
    // this.volatileInfo.setCurrentDirectory(directory.id,directory.name);
    
    console.log("directory is set",this.archives);
    // this.router.navigate(["home", "content",thithis.currentSectionName, directory.id, directory.name])
  }else{
    return;
  }
 
 }
}
