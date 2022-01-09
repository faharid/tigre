import { Component, ViewChild, OnInit, ElementRef, HostListener, AfterViewInit } from "@angular/core";

@Component({
  selector: "app-live",
  templateUrl: "live.component.html",
  styleUrls: ["live.component.scss"]
})

export class LiveComponent implements OnInit {

  imageSrc1 = "assets/img/img4.png";

  constructor() {
  }

  ngOnInit() {
    var body = document.getElementsByTagName("body")[0];
    body.classList.add("live-page");
  }

  ngOnDestroy() {
    var body = document.getElementsByTagName("body")[0];
    body.classList.remove("live-page");
  }
}
