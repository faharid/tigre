import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";

//LOCAL STORAGE
import { LocalStorageService } from 'ngx-webstorage';


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
    private localStorage: LocalStorageService,
  ) {
    router.events.subscribe(val => {
      this.autoclose = true;
      this.isCollapsed = true;
      this.path = window.location.pathname;
    });
  }

  ngOnInit() { }


  getToken() {
    if (this.localStorage.retrieve('token') != null) {
      return this.localStorage.retrieve('token');
    }
    return null;
  }

  logout() {
    this.clearToken();
    this.goToHome();
  }

  clearToken() {
    this.localStorage.clear('token');
  }

  goToHome(): void {
    this.router.navigateByUrl("/home");
  }

}
