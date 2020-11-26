import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { TaskService } from '../../services/task.service';
import { DataService } from '../../services/data.service';
import { AnnouncementService } from '../../services/announcement.service';
import { DirectoryService } from '../../services/directory.service';
import { SectionService } from '../../services/section.service';
import { Router } from '@angular/router';
import { OwlOptions } from 'ngx-owl-carousel-o';


@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})

export class DashboardComponent implements OnInit {

  // carousel options
  customOptions: OwlOptions = {
    loop: true,
    mouseDrag: true,
    touchDrag: true,
    pullDrag: true,
    dots: true,
    navSpeed: 700,
    navText: ['', ''],
    responsive: {
      0: {
        items: 1
      },
      400: {
        items: 1
      },
      740: {
        items: 1
      },
      940: {
        items: 1
      }
    },
    nav: true
  }



 TaskForm: FormGroup= new FormGroup({
  newTask: new FormControl(null),
  Date: new FormControl(null)
 });
 NewsForm: FormGroup =new FormGroup({
   Heading: new FormControl(null),
   Content: new FormControl(null),
 })

 setTask=false;

 tasks:any = [];
 announcements:any=[];
 user:any;
 date;

  constructor(private directoryManager: DirectoryService, private taskManager:TaskService, private dataManager: DataService,
    private announceManager:AnnouncementService,private router:Router,private sectionManager:SectionService) {

    // get user recently accessed folders
    directoryManager.getRecentFolders(dataManager.getActiveUser().email,dataManager.getEntity()).subscribe(result=>{
      this.user = result;
    })
    // get annoucements
    announceManager.getValidAnnouncements(dataManager.getEntity()).subscribe(result=>{
      this.announcements=result;
    });
    // get user tasks
    taskManager.getTasks(dataManager.getActiveUser().email,dataManager.getEntity()).subscribe(result=>{
      this.tasks = result;
      console.log(this.tasks, "these are the task");
    });

    this.date = new Date();

   }

  ngOnInit(): void {

  }

  // muting a news tag
  onAdd(){
    console.log("Add");
    document.getElementById("Modal-News").style.display="grid";
    document.getElementById("npm").style.display="none";
  }
// deleting
  onDelete(){
    console.log('delete');
  }
//Edditing folder
  onEdit(){
    console.log('edited');
  }
  //OPening task
  onTask(){
    console.log('Added task');
    document.getElementById("Modal-task").style.display="grid";
    document.getElementById("smth").style.display="none"
  }
//close new task
  taskClose(){
    document.getElementById("Modal-task").style.display="none";
    console.log('0clicked');
    document.getElementById("smth").style.display="block";
  }
//setting a new task
  onSubmit(){
    this.taskManager.newTask(this.dataManager.getActiveUser().email,{task:this.TaskForm.value.newTask,dueDate:this.TaskForm.value.Date,status:false},this.dataManager.getEntity())
    document.getElementById("Modal-task").style.display="none";
    document.getElementById("smth").style.display="block";

  }
  //done with task
  Done(_task){

    _task.done = true;
    this.taskManager.updateTask(this.dataManager.getActiveUser().email,_task,this.dataManager.getEntity());
  }

  unDone(_task){
    _task.done = false;
    this.taskManager.updateTask(this.dataManager.getActiveUser().email,_task,this.dataManager.getEntity());
  }

  DeleteTask(_task){
    this.taskManager.removeTask(this.dataManager.getActiveUser().email,_task,this.dataManager.getEntity());
  }

  onFolderClicked(directory) {
    console.log(directory,"this is the directory");
    if(directory.itemType=='folder'){
      // let section = this.sectionManager.getSectionName(directory.sectionId,this.dataManager.getEntity());
      // console.log("this is the section name obtained",section);
      this.router.navigate(["home", "content",this.dataManager.getEntity(),directory.sectionId ,"Report Teams Depost", directory.id, directory.name])
    }else{
      return;
    }

  }

  onNews(){
    console.log(this.NewsForm.value);
    document.getElementById("Modal-News").style.display="none";
    document.getElementById("npm").style.display="block";
  }

  closeNews(){
    document.getElementById("npm").style.display="block";
    document.getElementById("Modal-News").style.display="none";

  }
}
