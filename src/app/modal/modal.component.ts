import { UserService } from 'src/app/services/User.service';
import { User } from './../models/user.model';
import { InteractionService } from './../services/interaction.service';
import { Component, EventEmitter, OnInit, Output, Input } from '@angular/core';

@Component({
  selector: 'app-modal',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.scss']
})
export class ModalComponent implements OnInit {
  @Input() title: string;
  constructor() { }

  @Output("onResult") OnResult:EventEmitter<boolean> = new EventEmitter();
  
  ngOnInit(): void {
  
  }
 

  chooseOption(value:boolean){

    this.OnResult.emit(value);
   
  }

}
