import { BehaviorSubject, Subject } from 'rxjs';
import { Resource } from '../app/models/resources.model';

export class AdminResourceService{

private resources: Resource[]=[

    new Resource('Finance','20-20-19'),
    new Resource('Accounting','20-20-19'),
    new Resource('Music','20-2-19'),
    new Resource('Finance','5-20-19'),

  ];

EditResource= new BehaviorSubject<any>({});
header= new BehaviorSubject<any>({});

// Adding a resource
  addResource(item:Resource){
    this.resources.push(item);
  }


  //get User Groups
  getAllResources(){
    return this.resources.slice();
  }

//delete resource
onDeleteuserGroups(item: Resource){
  let index= this.resources.indexOf(item);
  if(index != -1){
    this.resources.splice(index, 1);
  }
}

//Edit resource
onEditResource(item){
  this.EditResource.next({details: item});
}

//update resource

UpdateResource(item:Resource, index){
  if (index != -1){
    this.resources[index]=item;
  }
}

//displaying the head
onDisplay(item){
  this.header.next({details:item})
}

}
