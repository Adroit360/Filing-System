import { Router } from '@angular/router';
import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'filing-system';
  isLoggedIn:boolean = false;

  constructor(private router:Router){
    // router.navigate(["login"]);
  }
}
