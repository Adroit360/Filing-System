import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-password',
  templateUrl: './password.component.html',
  styleUrls: ['./password.component.scss']
})
export class PasswordComponent implements OnInit {
  forgotPassword: FormGroup;
@Output('onResult') onResult:EventEmitter<boolean>=new EventEmitter();
  constructor() { }


  ngOnInit(): void {
    this.forgotPassword=new FormGroup({
      forgotPassword: new FormControl(null, Validators.required)
    })
  }

onSubmit(){
  console.log(this.forgotPassword);
}

onBack(value:boolean){
this.onResult.emit(value);
console.log('onBack',value);
}

}
