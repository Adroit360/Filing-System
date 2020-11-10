import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss']
})
export class SearchComponent implements OnInit {
  items=['text', 'yele', 'yawa','qwerty','yaw'];
  fontIcon = "fa fa-folder";
  constructor() { }

  ngOnInit(): void {
  }
  onSelected(item){
  console.log(item)
 }
}
