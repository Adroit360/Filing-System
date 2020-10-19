import { Group } from '../models/group.model';

export class UserGroupsService{

private userGroups: Group[]=[

    new Group('Finance', '20','20-20-19'),
    new Group('Finance', '20','20-20-19'),
    new Group('Finance', '20','20-20-19'),
    new Group('Finance', '20','20-20-19'),

  ];

  //get User Groups
  getuserGroups(){
    return this.userGroups.slice();
  }

  //delete user
onDeleteuserGroups(item: Group){
  let index= this.userGroups.indexOf(item);
  if(index!=1){
    this.userGroups.splice(index, 1);
  }
}

}
