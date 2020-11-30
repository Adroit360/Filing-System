import { AfterViewInit, Component, OnInit } from '@angular/core';
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

    this.date = new Date().toDateString();


  
   }
  

  ngOnInit(): void {
    //this.showSlidesAutomate();
    // this.showSlides(this.slideIndex);
  }

  ngAfterViewInit(){
   
    this.showSlidesAutomate();
    
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
    document.getElementById("files-a").style.display="none";

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
  var slides = document.getElementsByClassName("mySlides");
  var dots = document.getElementsByClassName("dot");
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
  var slides = document.getElementsByClassName("mySlides");
  var dots = document.getElementsByClassName("dot");
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

  setTimeout( (this.showSlidesAutomate).bind(this), 2000); // Change image every 2 seconds
  dots[this.slideIndexAutomate-1].className += " active";
 
}
}