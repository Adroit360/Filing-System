import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/services/User.service';
import { User } from '../../models/user.model';

@Component({
  selector: 'app-manage-user',
  templateUrl: './manage-user.component.html',
  styleUrls: ['./manage-user.component.scss']
})
export class ManageUserComponent implements OnInit {
 userDetails: User[] = [];
  constructor( private userdetails: UserService) { }

  ngOnInit(): void {
    this.userDetails = this.userdetails.getuserDetails();
  }

}
