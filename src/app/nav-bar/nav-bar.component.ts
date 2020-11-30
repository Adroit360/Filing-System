import { Router } from '@angular/router';
import { THIS_EXPR } from '@angular/compiler/src/output/output_ast';
import { Component, OnInit } from '@angular/core';
import { Subject } from 'rxjs';
import {AuthServiceService} from '../services/auth-service.service';
import { UserService } from '../services/User.service';
import { DataService } from '../services/data.service';
import { EntitiesService } from '../services/entities.service';

@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.scss']
})
export class NavBarComponent implements OnInit {

  user:any;
  constructor( private authManager:AuthServiceService,private userservice: UserService, private router: Router,
    private entityManager:EntitiesService, private dataManager: DataService) {
      this.user = dataManager.getActiveUser();
     }

  ngOnInit(): void {


  }

  // routes to the log in page
  onLogOut(){
    this.authManager.SignOut();
    this.router.navigate(["login"]);
  }

  updateSearch(searchTextValue: string) {
    // this._searchSubject.next( searchTextValue );
    this.router.navigate(['home/content/search']);
    this.dataManager.search(searchTextValue);
    console.log(searchTextValue);
  }

  // Profile(){
  //   document.getElementById('prfl').style.display="block";
  // }

  changeProfile(e){
      console.log(e)
      // let input = <any>document.querySelector('#file-upload');
      document.getElementById("file-upload").click();
  }




}
