import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss']
})
export class MenuComponent implements OnInit {
sections: string[] = ['Marketting', 'Accounting', 'Football', 'Engineering', 'Staff', 'Teaching', 'Sponsors'];
  constructor() { }

  ngOnInit(): void {
  }

}
