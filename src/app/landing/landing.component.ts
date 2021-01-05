import { ViewportScroller } from '@angular/common';
import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { Router } from '@angular/router';


@Component({
  selector: 'app-landing',
  templateUrl: './landing.component.html',
  styleUrls: ['./landing.component.scss'],
  encapsulation:ViewEncapsulation.None
})
export class LandingComponent implements OnInit {

  constructor(private router: Router, private viewportScroller: ViewportScroller) { }

  ngOnInit(): void {
  }

  // onLogin(){
  //   this.router.navigate(['login'])
  // }
  onClickScroll(elementId: string){
    this.viewportScroller.scrollToAnchor(elementId);
  }
}
