<<<<<<< HEAD

import { Component, EventEmitter, OnInit, Output } from '@angular/core';
=======
import { UserService } from 'src/app/services/User.service';
import { User } from './../models/user.model';
import { InteractionService } from './../services/interaction.service';
import { Component, EventEmitter, OnInit, Output, Input } from '@angular/core';
>>>>>>> fbfdcbd7ee4de206c3cbabf7c578414943fc466a

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
