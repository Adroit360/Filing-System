import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { DataService } from 'src/app/services/data.service';
import { EntitiesService } from 'src/app/services/entities.service';

@Component({
  selector: 'app-subscription-page',
  templateUrl: './subscription-page.component.html',
  styleUrls: ['./subscription-page.component.scss']
})
export class SubscriptionPageComponent implements OnInit {
  PaymentForm: FormGroup;

  modalcall=false;
  subscriptionPlan:any;
  subscriptionDate:string="";

  constructor(private entityManager:EntitiesService,private dataManager:DataService) { 
    entityManager.entitySubscriptionPackage(dataManager.getEntity()).subscribe(result=>{
      this.subscriptionPlan = result[0];
      console.log("sub",this.subscriptionPlan);
      this.subscriptionDate = new Date(this.subscriptionPlan.subscriptionDate.toDate()).toDateString();
      var element = document.getElementById("myBar");
      var width = 1;
      // var identity = setInterval(scene, 1000);
      let validity_days = (new Date(this.subscriptionPlan.expiringDate).getTime()- new Date(this.subscriptionPlan.subscriptionDate.toDate()).getTime());
      element.innerHTML=`${validity_days}` +' day(s) left ';
      element.style.width = (validity_days/30)*100 + '%';
    });
  }

  ngOnInit(): void {
    this.PaymentForm= new FormGroup({
      CardName: new FormControl(null),
      CardNumber: new FormControl(null),
      EndDate: new FormControl(null),
      CVV: new FormControl(null)
    });
  }


  onUnSubscribe(){
    confirm("Successully Unsubscribe from your package");
  }

  onUpgrade(){
    document.getElementById("box-2").style.display="block"
  }

  onCancel(){
    this.modalcall=!this.modalcall;
  }

  onSubmit(){
    console.log(this.PaymentForm.value);
  }

  onRenew(){
    this.modalcall=!this.modalcall;
  }

  
  update() {
    // var element = document.getElementById("myBar");
    // var width = 1;
    // // var identity = setInterval(scene, 1000);
    // let validity_days = (new Date(this.subscriptionPlan.expiringDate).getTime()- new Date(this.subscriptionPlan.subscriptionDate.toDate()).getTime())/this.MS_PER_DAY;
    // element.innerHTML=`${validity_days}` +' day(s) left ';
    // element.style.width = Math.ceil(width/30)*100 + '%';

      
    
  }
}
