import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-empty',
  templateUrl: './empty.component.html',
  styleUrls: ['./empty.component.scss']
})
export class EmptyComponent implements OnInit {
  departments = ['Marketting', 'Accounting', 'Finance', 'Football', 'Cleaning',
  'Marketting', 'Accounting', 'Finance', 'Football', 'Cleaning',
  'Marketting', 'Accounting', 'Finance', 'Football', 'Cleaning',
  'Marketting', 'Accounting', 'Finance', 'Football', 'Cleaning',
];
  constructor() { }

  ngOnInit(): void {
  }

}
