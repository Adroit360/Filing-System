import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-subscription-page',
  templateUrl: './subscription-page.component.html',
  styleUrls: ['./subscription-page.component.scss']
})
export class SubscriptionPageComponent implements OnInit {
  PaymentForm: FormGroup;

  modalcall=false;

  constructor() { }

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
    var element = document.getElementById("myBar");
    var width = 1;
    var identity = setInterval(scene, 1000);
    function scene() {
      if (width >= 100) {
        clearInterval(identity);
      } else {
        width++;
        element.innerHTML=`${width}` +' day(s) left ';
        element.style.width = width + '%';

      }
    }
  }
}
