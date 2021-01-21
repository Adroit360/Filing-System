import { ActivatedRoute, Router } from "@angular/router";
import { Component, OnInit, Renderer2 } from "@angular/core";
import { DataService } from "./services/data.service";
import { SectionService } from "./services/section.service";
import { LoaderService } from "src/interceptors/loader.service";

@Component({
  selector: "app-root",
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.scss"],
})
export class AppComponent implements OnInit {
  title = "filing-system";
  isLoggedIn: boolean = false;
  user: any;
  generalSection: any;

  constructor(
    private router: Router,
    private userInfo: DataService,
    private sectionService: SectionService,
    private activatedRoute: ActivatedRoute,
    private loaderService:LoaderService,
    private renderer:Renderer2
  ) {
    // router.navigate(["login"]);

    this.loaderService.httpProgress().subscribe((status: boolean) => {
      if (status) {
        this.renderer.addClass(document.body, 'busy');
      } else {
        this.renderer.removeClass(document.body, 'busy');
      }
    });
  }

  ngOnInit(): void {
    this.CheckingUser();
    // this.router.navigate(["welcome"]);
    document.addEventListener("DOMContentLoaded", () => {
      document.getElementById("zmmtg-root").style.display = "none";
    });
  }

  CheckingUser() {
    let _user = localStorage.getItem("user");
    if (!_user) {
      //this.router.navigate(["login"]);
      if (!window.location.href.includes("not-found"))
        this.router.navigate(["welcome"]);
      console.log("no user");
    } else {
      console.log("user");
      this.user = JSON.parse(_user);
      this.userInfo.setActiveUser(this.user).then(() => {
        this.generalSection = this.sectionService.getGeneralSection(
          this.user.entity
        );
        //  set default section and directory
        this.userInfo.setCurrentSection(this.generalSection.id, "general");
        this.userInfo.setCurrentDirectory(this.generalSection.id, "general");
        // console.log("activatedroute url",this.activatedRoute.url);
        if (!window.location.href.includes("not-found"))
          this.router.navigateByUrl("home/content/dashboard");
      });
    }
  }
}
