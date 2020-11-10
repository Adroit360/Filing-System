import { Component, OnInit } from '@angular/core';
import { DirectoryService } from '../../services/directory.service';
import { DataService } from '../../services/data.service';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss']
})
export class SearchComponent implements OnInit {
  items=['text', 'yele', 'yawa','qwerty','yaw'];
  fontIcon = "fa fa-folder";
  archives:any=[];
  constructor(private directoryManager: DirectoryService, private volatileInfo:DataService) { }

  ngOnInit(): void {
    this.directoryManager.getAccessibleArchives(this.volatileInfo.getActiveUser().accessList).subscribe(result=>{
        this.archives = result;
        console.log("this is the searched archives",this.archives);
    });
  }
  onSelected(item){
  console.log(item)
 }
}
