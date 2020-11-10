import { Component, OnInit } from '@angular/core';
import { DataService } from 'src/app/services/data.service';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss']
})
export class SearchComponent implements OnInit {
  items=['text', 'yele', 'yawa','qwerty','yaw'];
  fontIcon = "fa fa-folder";
  constructor( private data: DataService) { }

  ngOnInit(): void {
  }

  onSelected(item){
  console.log(item);

  //the search item
  this.data.searchItem.subscribe(item=>console.log(item));
 }
}
