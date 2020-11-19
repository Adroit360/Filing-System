import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {
 recentFolders=["beans", "banku", "tombrown", "teabread", "ampesi","gob3plantain"];
 TaskArr=[{newTask: "sm;fms;mf;", Date: "2020-11-09"},{newTask: "smmf;", Date: "2020-11-09"}]
 hooks=[];
 TaskForm: FormGroup= new FormGroup({
  newTask: new FormControl(null),
  Date: new FormControl(null)
 });
 setTask=false;
  constructor() {
    this.hooks= this.TaskArr.map(i=>true);
    console.log(this.hooks);

   }

  ngOnInit(): void {

  }

  // muting a news tag
  onMute(){
    console.log("muted");
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
    this.TaskArr.push(this.TaskForm.value);
    document.getElementById("Modal-task").style.display="none";
    console.log(this.TaskForm.value);
    document.getElementById("smth").style.display="block";

  }
  //done with task
  Done(index){
    for (let i =0;  i< this.hooks.length; i++) {
      if(i==index){
        this.hooks[i]=false;
        // document.getElementById("hiddenTexts").style.display="none";
      }else{

      }

    }

    // document.getElementById("hiddenTexts").style.display="block";
  }
  unDone(index){
    for (let i =0;  i< this.hooks.length; i++) {
      if(i==index){
        this.hooks[i]=true;
        // document.getElementById("hiddenTexts").style.display="none";
      }

    }

  }
  DeleteTask(){

  }
}
