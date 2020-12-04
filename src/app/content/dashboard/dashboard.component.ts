import { AfterViewInit, Component,ElementRef,OnInit, ViewChild} from '@angular/core';
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

export class DashboardComponent implements OnInit,AfterViewInit {

  // carousel options
  customOptions: OwlOptions = {
    loop: true,
    mouseDrag: true,
    touchDrag:true,
    pullDrag: true,
    dots: true,
    navSpeed: 1000,
    navText: ['', ''],
    autoplay: true,
    autoplayTimeout:5000,
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

dummytasks=['bet boys for the money','Download slides','beach mood activated',"eye clear, money finish"];

colors= [];
localColors=["red",'green','pink',"yellow"];
Random;

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
 slideIndex: number = 1;
 slideIndexAutomate = 0;

 @ViewChild ('createTab') nameInputRef: ElementRef;

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
    taskManager.getTaskGroups(dataManager.getActiveUser().email,dataManager.getEntity()).subscribe(result=>{
      this.tasks = result;
      this.generateColors();
      console.log(this.colors);
      console.log(this.tasks, "these are the task");
    });

    this.date = new Date().toDateString();

   }


  ngOnInit(): void {
    //this.showSlidesAutomate();
    // this.showSlides(this.slideIndex);

  }

  ngAfterViewInit(){

    this.showSlidesAutomate();

  }

  generateColors(){
    this.colors = [];
    for (let i =0;i< this.tasks.length;i++) {
      this.colors[i] = this.localColors[this.getColorIndex()];
    }
  }

  getColorIndex(){
    return Math.floor(Math.random() * this.localColors.length)
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
//openeing a task group
activeTaskGrp:any;
Tab(taskGrp){
  document.getElementById("task-content").style.display="none";
  document.getElementById("qwert").style.display="block";
  document.getElementById("list-task").style.display="block";
  document.getElementById("qwert1").style.display="flex";
  this.activeTaskGrp = taskGrp;
}

//back
back(){
  console.log("back")
  document.getElementById("task-content").style.display="flex";
  document.getElementById("list-task").style.display="none";
  document.getElementById("qwert").style.display="none";
  document.getElementById("qwert1").style.display="none";
  this.activeTaskGrp=null;
}

//create Task
createTask(){
  document.getElementById('c-task').style.display="block";
}

//Submitting task
SubmitTask(){
console.log(this.TaskForm.value)
document.getElementById('c-task').style.display="none";

}

//DELETEING ALL TASK modal
allDeleteTask(taskgrpId){
  document.getElementById("myModal").style.display='block';
  this.taskManager.removeTaskGroup(taskgrpId,this.dataManager.getActiveUser().email,this.dataManager.getEntity());


}

//DELETEING ALL TASK
onAllDelete(){
  document.getElementById("myModal").style.display='none';
  document.getElementById("task-content").style.display="flex";
  document.getElementById("list-task").style.display="none";
  document.getElementById("qwert").style.display="none";
  document.getElementById("qwert1").style.display="none";
}
//NOT DELETING ALL TASK
onCancelAll(){
  document.getElementById("myModal").style.display='none';
}


  //DONE WITH TASK
  OnDoneTask(){
    console.log("done");
  }
//DELETE A SINGLE TASK
DeleteTask(){
  console.log("delete");
}

//TAB CREATE
onCreateTab(){
  document.getElementById("createTab").style.display="flex";
}

//cREATED TAB
taskTab(){
  console.log(this.nameInputRef.nativeElement.value);
  document.getElementById("createTab").style.display="none";
  this.taskManager.newTaskGroup(this.nameInputRef.nativeElement.value,false,this.dataManager.getActiveUser().email,this.dataManager.getEntity());
  this.nameInputRef.nativeElement.value="";
}
  // unDone(_task){
  //   _task.done = false;
  //   this.taskManager.updateTask(this.dataManager.getActiveUser().email,_task,this.dataManager.getEntity());
  // }

  // DeleteTask(_task){
  //   this.taskManager.removeTask(this.dataManager.getActiveUser().email,_task,this.dataManager.getEntity());
  // }

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

  onAddAnnouncement(){
    console.log(this.NewsForm.value);
    document.getElementById("Modal-News").style.display="none";
    document.getElementById("npm").style.display="block";
    this.announceManager.newAnnouncement(this.NewsForm.value.Heading,this.NewsForm.value.Content,this.dataManager.getEntity());
  }

  closeNews(){
    document.getElementById("npm").style.display="block";
    document.getElementById("Modal-News").style.display="none";

  }



plusSlides(n) {
  this.showSlides(this.slideIndex += n);
}

currentSlide(n) {
  this.showSlides(this.slideIndex = n);
}

showSlides(n) {
  var i;
  var slides:any = document.getElementsByClassName("mySlides");
  var dots:any = document.getElementsByClassName("dot");
  if (n > slides.length) {this.slideIndex = 1}
  if (n < 1) {this.slideIndex = slides.length}
  for (i = 0; i < slides.length; i++) {
      if(slides[i])
        slides[i].style.display = "none";
  }
  for (i = 0; i < dots.length; i++) {
      dots[i].className = dots[i].className.replace(" active", "");
  }
  if(slides[this.slideIndexAutomate-1])
  slides[this.slideIndex-1].style.display = "block";
  dots[this.slideIndex-1].className += " active";

}

 showSlidesAutomate() {
  var i;
  var slides:any = document.getElementsByClassName("mySlides");
  var dots:any = document.getElementsByClassName("dot");
  for (i = 0; i < slides.length; i++) {
    if(slides[i])
      slides[i].style.display = "none";
  }
  for (i = 0; i < dots.length; i++) {
    dots[i].className = dots[i].className.replace(" active", "");
}
  this.slideIndexAutomate++;
  if (this.slideIndexAutomate > slides.length) {this.slideIndexAutomate = 1}
  if(slides[this.slideIndexAutomate-1])
  slides[this.slideIndexAutomate-1].style.display = "block";

  setTimeout( (this.showSlidesAutomate).bind(this), 5000); // Change text every 5 seconds
  if(dots[this.slideIndexAutomate-1])
  dots[this.slideIndexAutomate-1].className += " active";
}
}
