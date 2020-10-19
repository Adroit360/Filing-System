<<<<<<< HEAD

=======
import { UserService } from 'src/app/services/User.service';
import { User } from './../models/user.model';
>>>>>>> 48f8fc1d39ae03ab5559f7aa99fafee1c3a183b5
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
