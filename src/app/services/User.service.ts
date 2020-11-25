import { BehaviorSubject, Subject } from 'rxjs';
import { User } from '../models/user.model';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/firestore';
import { AngularFireStorage } from '@angular/fire/storage';

export class  UserService{
  private userDetails: User[]=[
    new User('adumatta@gmail.com','Nana', 'Kwaku', 'director'),
    new User('adumatta@gmail.com','Nana', 'Kwaku', 'director'),
    new User('adumatta@gmail.com','Nana', 'Kwaku', 'director'),
    new User('adatta@gmail.com','Nana', 'Kwaku', 'director'),
    new User('a@gmail.com','Nana', 'Kwaku', 'director')
  ];


  EditUser = new BehaviorSubject<any>({});

  getuserDetails(){
    return this.userDetails.slice();
  }

  
  //adding User
  addNewUser(newuser:User){
    this.userDetails.push(newuser);
  }

  //update user

  UpdateUser(item:User, index:any){
    if(index!=-1){
      this.userDetails[index]=item;
    }

  }



  //delete user
  onDeleteUser(item:User){
    let index = this.userDetails.indexOf(item);
    if (index != -1) {
      this.userDetails.splice(index, 1);
    }
  }

  //Edit user
  onEditUSer(item:User){
    this.EditUser.next({details: item});
  }

}
