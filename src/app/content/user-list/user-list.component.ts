import { Component, OnInit } from '@angular/core';
import { User } from 'src/app/models/user.model';
import { DataService } from 'src/services/data.service';
import { MessengerService } from 'src/services/messenger.service';
import { SharedResourceService } from 'src/services/shared-resource.service';
import { AdminResourceService } from 'src/services/AdminResource.service';
import { EntitiesService } from '../../../services/entities.service';

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
  ResourceId:string;
  ResourceName:string;
  ResourceOwner:string;
  ResourceObjects:any;
  resource:any;
  subjects:any=[];
  subs:[];

  constructor(private adminresource: AdminResourceService,private data: DataService, private msg: MessengerService,
    private resourceManager:SharedResourceService,private entityManager:EntitiesService ) {
    this.adminresource.EditResource.
    subscribe((item: {details:any})=>{
      this.ResourceId = item.details.id;
      this.ResourceName = item.details.name;
      this.ResourceOwner = item.details.owner;
      this.ResourceObjects= item.details.objects;
      // this.subjects = item.details.subjects;
      // console.log("subjects",this.subjects);
    });
     this.resourceManager.GetResource(this.ResourceId,this.data.getEntity()).subscribe(result=>{
      this.subjects = result.data().subjects;
      this.subs =  result.data().subjects;
      console.log(this.subjects, "this is subject array")
    })


  }


  ngOnInit(): void {
     this.entityManager.getEntityUsers(this.data.getEntity()).subscribe(users=>{
      this.users = users;
      console.log(this.users);
    // this.hooks=this.users.map(i=>true);
    });

  }

 add(userEmail){

      this.resourceManager.AddSubjectToResource(userEmail,this.ResourceId,this.ResourceName,this.ResourceOwner,this.ResourceObjects,this.data.getEntity()).then(()=>{
        this.updateSubjects();
      });



  }

  unAdd(userEmail){
    // for (let i = 0; i < this.hooks.length; i++) {
    //   if(i==index){
    //     // this.hooks[i]=true;
         this.resourceManager.RemoveSubjectFromResource(userEmail,this.ResourceId,this.ResourceName,this.ResourceOwner,this.ResourceObjects,this.data.getEntity()).then(()=>{
          this.updateSubjects();
         });

    //   }

    // }
  }

  existInResource(em:string){
      return   this.subjects.includes(em);
  }

 async updateSubjects(){
    await this.resourceManager.GetResource(this.ResourceId,this.data.getEntity()).subscribe(result=>{
      this.subjects = result.data().subjects;
      console.log(this.subjects, "this is subject array");
    });
  }
}
