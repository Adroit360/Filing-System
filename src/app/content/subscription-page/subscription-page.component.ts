import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { DomSanitizer } from '@angular/platform-browser';
import { DataService } from 'src/app/services/data.service';
import { EntitiesService } from 'src/app/services/entities.service';

@Component({
  selector: 'app-subscription-page',
  templateUrl: './subscription-page.component.html',
  styleUrls: ['./subscription-page.component.scss']
})
export class SubscriptionPageComponent implements OnInit {
  PaymentForm: FormGroup;
  entitySubscriptionInfo: any;
  modalcall = false;
  subscriptionPlan: any;
  subscriptionDate: string = "";
  ENDPOINT: string = "https://konvyapi.azurewebsites.net/transaction/pay";
  checkoutUrl;

  constructor(private entityManager: EntitiesService, private dataManager: DataService,
    private domSanitizer: DomSanitizer,
    private httpClient: HttpClient) {

    // console.log("stored subscr info",app);
    // entityManager.entitySubscriptionPackage(dataManager.getEntity()).subscribe(result=>{
    //   this.subscriptionPlan = result[0];
    //   console.log("sub",this.subscriptionPlan);
    //   this.subscriptionDate = new Date(this.subscriptionPlan.subscriptionDate.toDate()).toDateString();
    //   var element = document.getElementById("myBar");
    //   var width = 1;
    //   // var identity = setInterval(scene, 1000);
    //   let validity_days = (new Date(this.subscriptionPlan.expiringDate).getTime()- new Date(this.subscriptionPlan.subscriptionDate.toDate()).getTime());
    //   element.innerHTML=`${validity_days}` +' day(s) left ';
    //   element.style.width = (validity_days/30)*100 + '%';
    // });
  }

  ngOnInit(): void {
    this.PaymentForm = new FormGroup({
      CardName: new FormControl(null),
      CardNumber: new FormControl(null),
      EndDate: new FormControl(null),
      CVV: new FormControl(null)
    });
    this.subscriptionPlan = this.dataManager.getSubscriptionInfo();
    console.log("here", this.subscriptionPlan)
    var element = document.getElementById("myBar");
    var width = 1;
    // this.subscriptionDate = new Date(this.subscriptionPlan.subscriptionDate.toDate()).toDateString();
    let validity_days = Math.ceil(this.subscriptionPlan.validity_days);//(new Date(this.subscriptionPlan.expiringDate).getTime()- new Date(this.subscriptionPlan.subscriptionDate.toDate()).getTime());
    console.log(validity_days);
    element.innerHTML = `${validity_days}` + ' day(s) left ';
    element.style.width = (validity_days / 30) * 100 + '%';
  }


  onUnSubscribe() {
    confirm("Successully Unsubscribe from your package");
  }

  onUpgrade() {
    document.getElementById("box-2").style.display = "block"
  }

  onCancel() {
    this.modalcall = !this.modalcall;
  }

  onSubmit() {
    console.log(this.PaymentForm.value);
  }

  onRenew() {


    // get package price

    // subscribe
    let amount = 0;
    console.log(this.subscriptionPlan);
    let subscriptionId = this.entityManager.subscribe(this.dataManager.getEntity(),amount,this.subscriptionPlan );
    console.log(subscriptionId);
    let body = {
      amount: amount,
      description: "subscription payment",
      email: this.dataManager.getActiveUser().email,
      redirectUrl: "https://217f8815c37b.ngrok.io/home/content/dashboard"
    }
    this.httpClient.post(this.ENDPOINT, body).subscribe((data: { checkoutUrl }) => {
      console.log(data);
      if (data.checkoutUrl)
        this.checkoutUrl = this.domSanitizer.bypassSecurityTrustResourceUrl(data.checkoutUrl);
      this.modalcall = !this.modalcall;
    });

    // to do :: update subscriptionLogs and entitySubscription after payment successful
  }

  closeModal(){
    this.modalcall = false;
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
