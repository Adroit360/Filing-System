import {
  AfterViewInit,
  Component,
  ElementRef,
  OnInit,
  ViewChild,
} from "@angular/core";
import { FormControl, FormGroup } from "@angular/forms";
import { TaskService } from "../../../services/task.service";
import { DataService } from "../../../services/data.service";
import { AnnouncementService } from "../../../services/announcement.service";
import { DirectoryService } from "../../../services/directory.service";
import { SectionService } from "../../../services/section.service";
import { ActivatedRoute, Router } from "@angular/router";
import { OwlOptions } from "ngx-owl-carousel-o";
import { EntitiesService } from 'src/services/entities.service';
import { JsonPipe } from '@angular/common';
import { LoaderService } from "src/interceptors/loader.service";

@Component({
  selector: "app-dashboard",
  templateUrl: "./dashboard.component.html",
  styleUrls: ["./dashboard.component.scss"],
})
export class DashboardComponent implements OnInit, AfterViewInit {

  colors = [];
  localColors = ["red", "green", "pink", "yellow"];
  Random;

  DelTask: any;

  TaskForm: FormGroup = new FormGroup({
    newTask: new FormControl(null),
    Date: new FormControl(null),
  });
  NewsForm: FormGroup = new FormGroup({
    Heading: new FormControl(null),
    Content: new FormControl(null),
  });

  setTask = false;

  tasks: any = [];
  announcements: any = [];
  user: any;
  date;
  slideIndex: number = 1;
  slideIndexAutomate = 0;
  taskGroups: any = [];

  @ViewChild("createTab") nameInputRef: ElementRef;

  constructor(
    private directoryManager: DirectoryService,
    private taskManager: TaskService,
    private dataManager: DataService,
    private announceManager: AnnouncementService,
    private router: Router,
    private sectionManager: SectionService,
    private entityManager:EntitiesService,
    private activatedRoute:ActivatedRoute,
    private loaderService:LoaderService,

  ) {
    console.log(dataManager.getActiveUser());
    //get user recently accessed folders
    //
    this.loaderService.setHttpProgressStatus(true);
    //
    let reason = activatedRoute.snapshot.queryParams["reason"];
    let transactionId = activatedRoute.snapshot.queryParams["transaction_id"];
    if(reason && reason.includes("successful")){
      let transaction = localStorage.getItem("transaction");
      let transacObj = JSON.parse(transaction);
      if(transaction){
        this.entityManager.subscribe(transacObj.entity,transacObj.amount,transacObj.subscriptionType);
      }
    }

    console.error("REASON",);

    directoryManager
      .getRecentFolders(
        dataManager.getActiveUser().email,
        dataManager.getEntity()
      )
      .subscribe((result) => {
        this.user = result;
        this.dataManager.setCurrentRecentFolderLength(
          this.user.recentFolders.length
        );
        this.dataManager.setFirstRecentFolder(this.user.recentFolders[0]);
      });
    // get annoucements
    announceManager
      .getValidAnnouncements(dataManager.getEntity())
      .subscribe((result) => {
        this.announcements = result;
      });

   // get user tasks



   taskManager
      .getTaskGroups(dataManager.getActiveUser().email, dataManager.getEntity())
      .subscribe((result) => {
        this.tasks = result;
        this.generateColors();
        console.log(this.colors);
        console.log(this.tasks, "these are the task");
      });

      this.entityManager.entitySubscriptionPackage(dataManager.getEntity()).subscribe(result=>{
        this.dataManager.setSubscriptionInfo(result[0]);
        this.entityManager.getKonvySubscriptionPackageDetail(result[0].subscriptionType).then(obj=>{
          let data=obj.docs[0].data();
          this.dataManager.setKonvySubscriptionPackageInfo(data);
        });
      });

      this.loaderService.setHttpProgressStatus(false);

    this.date = new Date().toDateString();
  }

  ngOnInit(): void {
    //this.showSlidesAutomate();
    // this.showSlides(this.slideIndex);
    setTimeout(()=>{
      this.slideShow();
    },1000)

  }

  ngAfterViewInit()
  {
    // this.showSlides(this.slideIndex);
    // this.showSlidesAutomate();
  }

  generateColors()
  {
    this.colors = [];
    for (let i = 0; i < this.tasks.length; i++) {
      this.colors[i] = this.localColors[this.getColorIndex()];
    }
  }

  getColorIndex() {
    return Math.floor(Math.random() * this.localColors.length);
  }

  // muting a news tag
  onAdd() {
    console.log("Add");
    document.getElementById("Modal-News").style.display = "grid";
    document.getElementById("npm").style.display = "none";
  }

  //Edditing folder
  onEdit() {
    console.log("edited");
  }

  //openeing a task group
  activeTaskGrp: any;
  activeTaskArray: any = [];
  Tab(taskGrp) {
    document.getElementById("list-task").style.display = "block";

    this.activeTaskArray = taskGrp.tasks;
    this.activeTaskGrp = taskGrp;
    document.getElementById("task-content").style.display = "none";
    document.getElementById("qwert").style.display = "block";
    // document.getElementById("list-task").style.display="block";
    document.getElementById("qwert1").style.display = "flex";
  }

  //back
  back() {
    console.log("back");
    document.getElementById("task-content").style.display = "flex";
    document.getElementById("list-task").style.display = "none";
    document.getElementById("qwert").style.display = "none";
    document.getElementById("qwert1").style.display = "none";
    this.activeTaskGrp = null;
  }

  //create Task
  createTask() {
    let element = document.getElementById("TheTop");
    let scrollHeight = element.scrollHeight + 100;
    console.log("scrollHeight", scrollHeight);
    element.scrollTo(scrollHeight, 0);
    document.getElementById("c-task").style.display = "block";
    document.getElementById("list-task").style.display = "block";
  }

  //Submitting task
  newTask() {
    let taskObj = {
      task: this.TaskForm.value.newTask,
      dueDate: new Date(this.TaskForm.value.Date).toDateString(),
      status: false,
    };
    console.log(taskObj);
    this.taskManager
      .newTask(
        this.dataManager.getActiveUser().email,
        taskObj,
        this.activeTaskGrp.id,
        this.dataManager.getEntity()
      )
      .subscribe((result) => {
        result.forEach((task) => {
          if (task.id == this.activeTaskGrp.id) {
            this.activeTaskArray = task.tasks;
          }
        });
      });
    // get user tasks
    this.Tab(this.activeTaskGrp);
    //reset from
    this.TaskForm.reset();
    document.getElementById("c-task").style.display = "none";
    // reset task name field to null
    // this.TaskForm.value.newTask=null;
  }

  //Calling ALL  delete TASK modal
  allDeleteTask(taskgrpId) {
    document.getElementById("myModal").style.display = "block";

    this.DelTask = taskgrpId;
  }

  //DELETEING ALL TASK
  onAllDelete() {
    document.getElementById("myModal").style.display = "none";
    document.getElementById("task-content").style.display = "flex";
    document.getElementById("list-task").style.display = "none";
    document.getElementById("qwert").style.display = "none";
    document.getElementById("qwert1").style.display = "none";
    this.taskManager.removeTaskGroup(
      this.DelTask,
      this.dataManager.getActiveUser().email,
      this.dataManager.getEntity()
    );
    this.activeTaskGrp = false;
  }
  //NOT DELETING ALL TASK
  onCancelAll() {
    document.getElementById("myModal").style.display = "none";
  }

  //DONE WITH TASK
  OnDoneTask(tk, status) {
    if (status == "1") {
      tk.done = true;
    } else if (status == "2") {
      tk.done = false;
    }

    this.taskManager.updateTask(
      this.dataManager.getActiveUser().email,
      tk,
      this.activeTaskGrp.id,
      this.dataManager.getEntity()
    );
  }

  //DELETE A SINGLE TASK
  DeleteTask(tk) {
    console.log("delete");
    this.taskManager.removeTask(
      this.dataManager.getActiveUser().email,
      tk,
      this.activeTaskGrp.id,
      this.dataManager.getEntity()
    );
  }

  //TAB CREATE
  onCreateTab() {
    document.getElementById("createTab").style.display = "flex";
  }

  //cREATED TAB
  taskTab() {
    console.log(this.nameInputRef.nativeElement.value);
    document.getElementById("createTab").style.display = "none";
    this.taskManager.newTaskGroup(
      this.nameInputRef.nativeElement.value,
      false,
      this.dataManager.getActiveUser().email,
      this.dataManager.getEntity()
    );
    this.nameInputRef.nativeElement.value = "";
  }
  // unDone(_task){
  //   _task.done = false;
  //   this.taskManager.updateTask(this.dataManager.getActiveUser().email,_task,this.dataManager.getEntity());
  // }

  // DeleteTask(_task){
  //   this.taskManager.removeTask(this.dataManager.getActiveUser().email,_task,this.dataManager.getEntity());
  // }

  onFolderClicked(directory) {
    console.log(directory, "this is the directory");
    if (directory.itemType == "folder") {
      // let section = this.sectionManager.getSectionName(directory.sectionId,this.dataManager.getEntity());
      // console.log("this is the section name obtained",section);
      this.router.navigate([
        "home",
        "content",
        this.dataManager.getEntity(),
        directory.sectionId,
        "Report Teams Depost",
        directory.id,
        directory.name,
      ]);
      } else {
      return;
    }
  }
  // Closing a Task-tab
  closeTab() {
    document.getElementById("createTab").style.display = "none";
  }

  // Canceling a new task
  closeTask() {
    document.getElementById("c-task").style.display = "none";
  }
  onAddAnnouncement() {
    console.log(this.NewsForm.value);
    document.getElementById("Modal-News").style.display = "none";
    document.getElementById("npm").style.display = "block";
    this.announceManager.newAnnouncement(
      this.NewsForm.value.Heading,
      this.NewsForm.value.Content,
      this.dataManager.getEntity()
    );
    this.NewsForm.reset();
  }

  closeNews() {
    document.getElementById("npm").style.display = "block";
    document.getElementById("Modal-News").style.display = "none";
  }

  //VIEWING ALL
  onViewAll() {
    document.getElementById("lets-hide").style.display = "block";
    document.getElementById("npm").style.display = "none";
  }
  // Deleting Announcement
  delAnnounce(id) {
    this.announceManager.removeAnnouncement(id, this.dataManager.getEntity());
  }

  // CLOSING THE POP-UP CONTENT
  closeAllAnnounce() {
    document.getElementById("npm").style.display = "block";
    document.getElementById("lets-hide").style.display = "none";
  }

  plusSlides(n) {
    this.showSlides((this.slideIndex += n));
  }

  currentSlide(n) {
    this.showSlides((this.slideIndex = n));
  }

  showSlides(n) {
    var i;
    var slides: any = document.getElementsByClassName("mySlides");
    var dots: any = document.getElementsByClassName("dot");
    if (n > slides.length) {
      this.slideIndex = 1;
    }
    if (n < 1) {
      this.slideIndex = slides.length;
    }
    for (i = 0; i < slides.length; i++) {
      //if(slides[i])
      slides[i].style.display = "none";
    }
    for (i = 0; i < dots.length; i++) {
      dots[i].className = dots[i].className.replace(" active", "");
    }
    //if(slides[this.slideIndexAutomate-1])
    slides[this.slideIndex - 1].style.display = "block";
    dots[this.slideIndex - 1].className += " active";
  }

  //  showSlidesAutomate() {
  //   var i;
  //   var slides:any = document.getElementsByClassName("mySlides");
  //   var dots:any = document.getElementsByClassName("dot");
  //   for (i = 0; i < slides.length; i++) {
  //     if(slides[i])
  //       slides[i].style.display = "none";
  //   }
  //   for (i = 0; i < dots.length; i++) {
  //     dots[i].className = dots[i].className.replace(" active", "");
  // }
  //   this.slideIndexAutomate++;
  //   if (this.slideIndexAutomate > slides.length) {this.slideIndexAutomate = 1}
  //   if(slides[this.slideIndexAutomate-1])
  //   slides[this.slideIndexAutomate-1].style.display = "block";

  //   setTimeout( (this.showSlidesAutomate).bind(this), 4000); // Change text every 5 seconds
  //   if(dots[this.slideIndexAutomate-1])
  //   dots[this.slideIndexAutomate-1].className += " active";
  // }

  slideShow() {
    const slideContainer: any = document.querySelector(".slide_container");
    const slide: any = document.querySelector(".slides");
    const nextBtn: any = document.getElementById("next-btn");
    const prevBtn: any = document.getElementById("prev-btn");
    const interval: any = 3000;

    let slides: any = document.querySelectorAll(".slide");
    let index: any = 1;
    let slideId: any;

    const firstClone = slides[0].cloneNode(true);
    const lastClone = slides[slides.length - 1].cloneNode(true);

    firstClone.id = "first-clone";
    lastClone.id = "last-clone";

    slide.append(firstClone);
    slide.prepend(lastClone);

    const slideWidth = slides[index].clientWidth;

    slide.style.transform = `translateX(${-slideWidth * index}px)`;

    console.log(slides);

    const startSlide = () => {
      slideId = setInterval(() => {
        moveToNextSlide();
      }, interval);
    };

    const getSlides = () => document.querySelectorAll(".slide");

    slide.addEventListener("transitionend", () => {
      slides = getSlides();
      if (slides[index].id === firstClone.id) {
        slide.style.transition = "none";
        index = 1;
        slide.style.transform = `translateX(${-slideWidth * index}px)`;
      }

      if (slides[index].id === lastClone.id) {
        slide.style.transition = "none";
        index = slides.length - 2;
        slide.style.transform = `translateX(${-slideWidth * index}px)`;
      }
    });

    const moveToNextSlide = () => {
      slides = getSlides();
      if (index >= slides.length - 1) return;
      index++;
      slide.style.transition = ".7s ease-out";
      slide.style.transform = `translateX(${-slideWidth * index}px)`;
    };

    const moveToPreviousSlide = () => {
      if (index <= 0) return;
      index--;
      slide.style.transition = ".7s ease-out";
      slide.style.transform = `translateX(${-slideWidth * index}px)`;
    };

    slideContainer.addEventListener("mouseenter", () => {
      clearInterval(slideId);
    });

    slideContainer.addEventListener("mouseleave", startSlide);
    nextBtn.addEventListener("click", moveToNextSlide);
    prevBtn.addEventListener("click", moveToPreviousSlide);

    startSlide();
  }
}
