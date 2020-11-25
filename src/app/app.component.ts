import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit{
  title = 'filing-system';
  isLoggedIn:boolean = false;

  constructor(private router:Router){
    // router.navigate(["login"]);
  }

  ngOnInit(): void {
<<<<<<< HEAD
    // this.router.navigate(["login"]);
    
=======
     this.router.navigate(["login"]);
    // this.router.navigate(["home/content/dashboard"]);
>>>>>>> 253b9e43d16e87dff5609d9ee3f94981ec9e0c24
  }
}
