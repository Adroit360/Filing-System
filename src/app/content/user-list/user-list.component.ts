import { Component, OnInit } from '@angular/core';
import { User } from 'src/app/models/user.model';
import { DataService } from 'src/app/services/data.service';
import { MessengerService } from 'src/app/services/messenger.service';

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.scss']
})
export class UserListComponent implements OnInit {
  delete: boolean;
  user: User;
  modalState: boolean;
  users:any;
  checked=false;
  status=true;
  hooks=[];
  constructor(private data: DataService, private msg: MessengerService ) {

    //this.hooks=this.users.map(i=>true);

  }

  ngOnInit(): void {
    this.users = this.msg.getUsers();

  }

  add(item,index){
    //console.log(this.hooks);
   console.log(this.users)
    this.checked=true;
    this.status=false;
  }

}
