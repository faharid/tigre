import {
  Component,
  OnInit, Inject, ElementRef, ViewChild, AfterViewInit
} from "@angular/core";
import { Location } from "@angular/common";
import { DOCUMENT } from "@angular/common";

//LOCAL STORAGE
import { LocalStorageService } from 'ngx-webstorage';
import { NavigationEnd, Router } from '@angular/router';
import { filter } from "rxjs/operators";
import { timer } from "rxjs";


@Component({
  selector: "app-root",
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.scss"]
})
export class AppComponent implements OnInit, AfterViewInit {


  @ViewChild('topRightLight') topRightLight: ElementRef;
  @ViewChild('topLeftLight') topLeftLight: ElementRef;
  @ViewChild('bottomLeftLight') bottomLeftLight: ElementRef;
  @ViewChild('bottomRightLight') bottomRightLight: ElementRef;
  animatedActive = true;

  constructor(
    public location: Location,
    private localStorage: LocalStorageService,
    private router: Router,
    @Inject(DOCUMENT) document
  ) {
    //this.localStorage = localStorage;
  }




  ngOnInit() {

    /*
    if (this.getToken()) {
      this.goToMain();
    } else {
      this.goToHome();
    }
    */

    timer(1000).subscribe(x => {
      this.animatedActive = false;
    });

  }

  public ngAfterViewInit() {


    timer(1000).subscribe(x => {

      this.router.events
        .pipe(filter(event => event instanceof NavigationEnd))
        .subscribe((event: NavigationEnd) => {

          this.animatedActive = true;

          timer(1000).subscribe(x => {
            this.animatedActive = false;
          });


        });

    });

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
