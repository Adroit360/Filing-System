import { Component, OnInit } from '@angular/core';
// import { auth } from 'firebase';
import {AuthServiceService} from '../services/auth-service.service';
import {MessengerService} from '../services/messenger.service';
import {User,Section,Directory } from '../models/model';

@Component({
  selector: 'app-dbtest',
  templateUrl: './dbtest.component.html',
  styleUrls: ['./dbtest.component.scss']
})
export class DbtestComponent implements OnInit {

  user:User;
  section:Section;
  constructor(private msg:MessengerService,private authSer:AuthServiceService) {
     
   }

  ngOnInit(): void {
  }

  async register (){
    console.log('start db register function');
    this.user={
      id:"",firstName:"Barsare", lastName:"Yoiuva",email:"indomieintel@gmail.com",role:"manager",accessList:[],deletionPrivilege:false
    }

    await this.msg.newUser(this.user).then(result=>{console.log(result)});
    console.log('end db register function');
  }

  async signIn(){
    console.log("inside signin ");
    await this.authSer.SignIn("agbey@adroit360gh.com","defaultpassword").then(a=>{
      console.log(a);
    });
    console.log("end signin ");
  }

  async signOut(){
    console.log("in sign out method");
    await this.authSer.SignOut();
    console.log('successful sign out');
  }

  async newSection(){
    console.log("enter new section method");
    let dt = new Date();
    this.section={
      id:"",name:"IT Department",dateCreated:dt.toLocaleDateString(), items:[]
    }
    await this.msg.newSection(this.section).then(a=>{console.log(a)});
    console.log('end section creation');
  }
  file:File;
  async addFile(){
    // this.file={
    //   name:"savings.xd",contentType:"world", url:"doc/sdfd/kdf",lock:false,itemType:'file',lastWriteDate:new Date().toDateString(),lastReadDate:new Date().toDateString()
    // };

    //this.msg. 

  }
state:any;
  async selectedFile(event: any){
    const file = event.target.files[0];

    console.log("file",file);
    this.state = await this.msg.uploadFile(file,"sakrefijd","BARCHITECUTE","KnRmC4N3ivgYLzSvexjT");
    console.log("after state is set",this.state);
    console.log('done with upload');
  }

  async createDirectory(){
    let parentId="BARCHITECUTE";
    const directory: Directory={
      id: "",
      name:"myFirst Directory",
      itemType:"folder",
      dateCreated:new Date().toLocaleDateString(),
      parentId:parentId,
      lock:false    
  }

  console.log('creating folder...');
  await this.msg.newDirectory(parentId,directory).then(e=>{console.log(e)});
  console.log("folder created");

  }

  async setAccessControl(userId,resourceId){
    
  }

  async getReadDirectory(){
    await this.msg.getDirectoryContent("BARCHITECUTE","KnRmC4N3ivgYLzSvexjT",["adfd"]).then(e=>{console.log("directory content",e);})
  }
}
