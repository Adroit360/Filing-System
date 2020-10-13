import { User } from '../models/user.model';

export class  UserService{
  private userDetails: User[]=[
    new User('adumatta@gmail.com','Nana', 'Kwaku', 'director'),
    new User('adumatta@gmail.com','Nana', 'Kwaku', 'director'),
    new User('adumatta@gmail.com','Nana', 'Kwaku', 'director'),
    new User('adumatta@gmail.com','Nana', 'Kwaku', 'director'),
    new User('adumatta@gmail.com','Nana', 'Kwaku', 'director')
  ];


  getuserDetails(){
    return this.userDetails.slice();
  }

  addNewUser(newuser:User){
    this.userDetails.push(newuser)
  }
}
