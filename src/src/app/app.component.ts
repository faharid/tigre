import {
  Component,
  OnInit,
  Renderer2,
  HostListener,
  Inject
} from "@angular/core";
import { Location } from "@angular/common";
import { DOCUMENT } from "@angular/common";

//LOCAL STORAGE
import { LocalStorageService } from 'ngx-webstorage';
import { Router } from '@angular/router';


@Component({
  selector: "app-root",
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.scss"]
})
export class AppComponent implements OnInit {

  //LOCAL STORAGE
  //localStorage: CoolLocalStorage;

  constructor(
    private renderer: Renderer2,
    public location: Location,
    private localStorage: LocalStorageService,
    private router: Router,
    @Inject(DOCUMENT) document
  ) {
    //this.localStorage = localStorage;
  }


  @HostListener("window:scroll", ["$event"])
  onWindowScroll(e) {
    if (window.pageYOffset > 300) {
      var element = document.getElementById("navbar-top");
      /* if (element) {
        element.classList.remove("navbar-transparent");
        element.classList.add("bg-danger");
      } */
    } else {
      var element = document.getElementById("navbar-top");
      /* if (element) {
        element.classList.add("navbar-transparent");
        element.classList.remove("bg-danger");
      } */
    }
  }
  ngOnInit() {
    this.onWindowScroll(event);

    /*
    if (this.getToken()) {
      this.goToMain();
    } else {
      this.goToHome();
    }
    */

  }

  saveToken(token: string) {
    this.localStorage.store('token', token);
  }

  clearToken() {
    this.localStorage.clear('token');
  }

  getToken() {
    if (this.localStorage.retrieve('token') != null) {
      return this.localStorage.retrieve('token');
    }
    return null;
  }

  goToMain(): void {
    this.router.navigateByUrl("/live");
  }

  goToHome(): void {
    this.router.navigateByUrl("/home");
  }


}
