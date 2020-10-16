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

// alternate array to load the files from the server
department_files = ['invoice.pdf', 'invoice.doc', 'invoice.txt', 'invoice.jpeg', 'invoice.png',]
title="";
fontIcon = "fa fa-folder";

  constructor() { }

  ngOnInit(): void {
  }

  onFolderClicked(item: string){
    this.title += " > "+item;
    this.departments = [];
    this.departments = this.department_files;
  }
}
