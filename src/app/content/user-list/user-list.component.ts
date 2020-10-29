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
  checked;
  status=true;
  hooks=[];
  constructor(private data: DataService, private msg: MessengerService ) {

    //this.hooks=this.users.map(i=>true);

  }

  ngOnInit(): void {
     this.msg.getUsers().subscribe(users=>{
      this.users = users;
      console.log(this.users);
    this.hooks=this.users.map(i=>true);
    });

  }

  add(index){
    console.log(index);

    for (let i = 0; i < this.hooks.length; i++) {
      if(i == index){
        this.hooks[i]= false;
        //this.checked=true;
      }
    }

  }

  unAdd(index){
    for (let i = 0; i < this.hooks.length; i++) {
      if(i==index){
        this.hooks[i]=true;
       // this.checked=false;
      }

    }
  }

}
