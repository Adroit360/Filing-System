import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-manage-user-groups',
  templateUrl: './manage-user-groups.component.html',
  styleUrls: ['./manage-user-groups.component.scss']
})
export class ManageUserGroupsComponent implements OnInit {
  // will change the date created to a Date type later
  userGroups: {department: string, numOfPeople: number, dateCreated: string}[]=[
    {department: 'Finance Department', numOfPeople :13, dateCreated: '22-12-2009'},
    {department: 'Finance Department', numOfPeople :13, dateCreated: '22-12-2009'},
    {department: 'Finance Department', numOfPeople :13, dateCreated: '22-12-2009'},
    {department: 'Finance Department', numOfPeople :13, dateCreated: '22-12-2009'},
    {department: 'Finance Department', numOfPeople :13, dateCreated: '22-12-2009'},
    {department: 'Finance Department', numOfPeople :13, dateCreated: '22-12-2009'},
    {department: 'Finance Department', numOfPeople :13, dateCreated: '22-12-2009'},
    {department: 'Finance Department', numOfPeople :13, dateCreated: '22-12-2009'},
    {department: 'Finance Department', numOfPeople :13, dateCreated: '22-12-2009'},
      {department: 'Finance Department', numOfPeople :13, dateCreated: '22-12-2009'},
    {department: 'Finance Department', numOfPeople :13, dateCreated: '22-12-2009'},
    {department: 'Finance Department', numOfPeople :13, dateCreated: '22-12-2009'},
    {department: 'Finance Department', numOfPeople :13, dateCreated: '22-12-2009'},
    {department: 'Finance Department', numOfPeople :13, dateCreated: '22-12-2009'},
    {department: 'Finance Department', numOfPeople :13, dateCreated: '22-12-2009'},
  ]
  constructor() { }

  ngOnInit(): void {
  }

}
