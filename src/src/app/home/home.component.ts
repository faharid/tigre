import { Component, ViewChild, OnInit, ElementRef, HostListener, AfterViewInit } from "@angular/core";
import { NotifierService } from "angular-notifier";
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { NgAnimateScrollService } from 'ng-animate-scroll';
import smoothscroll from 'smoothscroll-polyfill';


@Component({
  selector: "app-home",
  templateUrl: "home.component.html",
  styleUrls: ["home.component.scss"]
})
export class HomeComponent implements OnInit {

  imageSrc1 = "assets/img/img1.png";
  imageSrc2 = "assets/img/img2.png";
  imageSrc3 = "assets/img/img3.png";
  imageSrc4 = "assets/img/img4.png";

  @ViewChild('target1') public target1: ElementRef;
  @ViewChild('target2') public target2: ElementRef;
  @ViewChild('target3') public target3: ElementRef;

  private readonly notifier: NotifierService;

  loadedAnimationIDs = [];
  opacityZero = 0.0;
  image2Opacity = 0.0;
  image2Transparency = 1.0;
  image3Opacity = 0.0;
  image3Transparency = 1.0;

  constructor(public notifierService: NotifierService,
    fb: FormBuilder, private animateScrollService: NgAnimateScrollService) {
    this.notifier = notifierService;
    smoothscroll.polyfill();
  }

  @HostListener('window:scroll', ['$event']) // for window scroll events
  onScroll(event) {

    this.image2Opacity = this.getImageOpacity(30);
    this.image2Transparency = this.getImageTransparency(30);

    this.image3Opacity = this.getImageOpacity(65);
    this.image3Transparency = this.getImageTransparency(65);

  }

  scrollTo(element: any) {
    //element.scrollIntoView({ block: 'start', inline: 'nearest', duration: 3000, behavior: "smooth" });
    element.scrollIntoView({ behavior: 'smooth', block: 'nearest', inline: 'end' });
  }

  navigateTo(id: string, duration?: number) {
    this.animateScrollService.scrollToElement(id, duration)
  }


  ngOnInit() {
    var body = document.getElementsByTagName("body")[0];
    body.classList.add("home-page");
  }


  ngAfterViewInit() {

    //this.removeAllAnimations();
    const image4 = document.querySelector('#image4');
  }


  removeAllAnimations() {
    var elems = document.getElementsByClassName("animate__animated");

    console.log(elems.length);

    [].forEach.call(elems, function (el) {
      console.log(el);
      el.classList.remove("animate__animated");
    });

  }

  refreshSlideElement(id) {

    if (!this.loadedAnimationIDs.includes(id)) {
      this.loadedAnimationIDs.push(id);

      var element = document.querySelector(id) as HTMLElement;


      if (id == '#image4') {
        element.classList.add('animate__animated');
        element.classList.add('animate__fadeInUp');
        element.classList.add('animate__delay-0.5s');
      }

    }

  };



  ngOnDestroy() {
    var body = document.getElementsByTagName("body")[0];
    body.classList.remove("home-page");
  }


  getImageOpacity(position: number): number {

    var opacity = 0;
    let gap = 0;

    let scrollPercent = (window.pageYOffset / window.innerHeight) / 3 * 100;

    //let diff = Math.abs(position - scrollPercent);
    let diff = position - scrollPercent;

    if (diff <= gap) {
      opacity = 1;
    } else {
      opacity = 1 - (diff / 100) * 5;
    }

    return opacity;
  }

  getImageTransparency(position: number): number {

    var opacity = 0;
    let gap = 0.1;

    let scrollPercent = (window.pageYOffset / window.innerHeight) / 3 * 100;

    //let diff = Math.abs(position - scrollPercent);
    let diff = position - scrollPercent;

    if (diff <= gap) {
      opacity = 0;
    } else {
      opacity = (diff / 100) * 6;

      if (opacity > 1.0) {
        opacity = 1.0;
      }

    }

    return opacity;
  }



}
