import { User } from '../models/user.model';

export class  UserService{
  private userDetails: User[]=[
    new User('adumatta@gmail.com','Nana', 'Kwaku', 'director'),
    new User('adumatta@gmail.com','Nana', 'Kwaku', 'director'),
    new User('adumatta@gmail.com','Nana', 'Kwaku', 'director'),
    new User('adatta@gmail.com','Nana', 'Kwaku', 'director'),
    new User('a@gmail.com','Nana', 'Kwaku', 'director')
  ];


  getuserDetails(){
    return this.userDetails.slice();
  }

  //adding User
  addNewUser(newuser:User){
    this.userDetails.push(newuser);
  }

  //delete user
  onDeleteUser(item:User){
    let index = this.userDetails.indexOf(item);
    if (index != -1) {
      this.userDetails.splice(index, 1);
    }
  }

  // editUser(item:User){
  //   let index= this.userDetails.indexOf(item);
  //   if (index !=-1){

  //   }
  // }
}
