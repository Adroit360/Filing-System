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
    // this.router.navigate(["welcome"]);
    this.router.navigate(["login"]);
    document.addEventListener("DOMContentLoaded",()=>{
      document.getElementById('zmmtg-root').style.display = 'none';
    })
  }
}
