import { Component, OnInit, Inject} from "@angular/core";
import { ActivatedRoute} from '@angular/router';
import { Router } from '@angular/router';
import { DOCUMENT } from '@angular/common';

@Component({
  selector: "app-finish",
  templateUrl: "finish.component.html",
  styleUrls:["finish.component.scss"]
})
export class FinishComponent implements OnInit {

  imageSrc1="assets/img/img1.png";
  imageSrc2="assets/img/img10.png";
  imageSrc3="assets/img/img4.png";
  imageSrc4="assets/img/cnt2.png";

  constructor(  @Inject(DOCUMENT) private document: Document,
              public route: ActivatedRoute,
              private router: Router) {
  } 
  
  ngOnInit() {
    let that = this;
    setTimeout(function(){
      that.exit()
    }, 3000);

    var body = document.getElementsByTagName("body")[0];
    body.classList.add("finish-page");
  }

  exit(){
    this.document.location.href = 'https://cnt.com.ec/';
  }

  ngOnDestroy() {
    var body = document.getElementsByTagName("body")[0];
    body.classList.remove("finish-page");
  }

  back(){
    this.router.navigate(['/home'])
  }
}
