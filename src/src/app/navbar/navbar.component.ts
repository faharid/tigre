import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";

@Component({
  selector: "app-navbar",
  templateUrl: "./navbar.component.html",
  styleUrls: ["./navbar.component.scss"]
})
export class NavbarComponent implements OnInit {

  path = "";
  isCollapsed = true;
  autoclose = false;
  constructor(private router: Router,
  ) {
    router.events.subscribe(val => {
      this.autoclose = true;
      this.isCollapsed = true;
      this.path = window.location.pathname;
    });
  }

  ngOnInit() { }
}
