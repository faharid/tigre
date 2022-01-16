import { Component, ViewChild, OnInit, ElementRef, HostListener, AfterViewInit } from "@angular/core";
import { NotifierService } from "angular-notifier";
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { trigger, transition, animate, style } from '@angular/animations'

@Component({
  selector: "app-concurso",
  templateUrl: './concurso.component.html',
  styleUrls: ['./concurso.component.scss'],

  animations: [


    trigger('slideInOut', [

      transition('center => left', [
        style({ transform: 'translateX(0%)' }),
        animate('300ms ease-in', style({ transform: 'translateX(150%)', opacity: '0' }))
      ]),
      transition('center => right', [
        style({ transform: 'translateX(0%)' }),
        animate('300ms ease-in', style({ transform: 'translateX(-150%)', opacity: '0' }))
      ]),
      transition('right => center', [
        style({ transform: 'translateX(150%)' }),
        animate('300ms ease-in', style({ transform: 'translateX(0%)', opacity: '1' }))
      ]),
      transition('left => center', [
        style({ transform: 'translateX(-150%)' }),
        animate('300ms ease-in', style({ transform: 'translateX(0%)', opacity: '1' }))
      ]),

    ])
  ]




})
export class ConcursoComponent implements OnInit {

  questions = ["Pregunta 1", "Pregunta 2", "Pregunta 3"];
  actualIndex = 0;
  longText = "The Shiba Inu is the smallest of the six original and distinct spitz breeds of dog from Japan. A small, agile dog that copes very well with mountainous terrain, the Shiba Inu was originally bred for hunting.";
  transition = "center";
  visible = true;
  start = false;


  constructor(public notifierService: NotifierService,
    fb: FormBuilder) {

  }

  ngOnInit() {
    var body = document.getElementsByTagName("body")[0];
    body.classList.add("home-page");
  }

  ngOnDestroy() {
    var body = document.getElementsByTagName("body")[0];
    body.classList.remove("home-page");
  }


  previousQuestion() {

    if (this.actualIndex != 0) {

      this.transition = "left";
      let pivotIndex = this.actualIndex;

      setTimeout(() => {
        this.actualIndex = -1;
        this.actualIndex = pivotIndex - 1;
        this.visible = false;

        setTimeout(() => {
          this.visible = true;
          this.transition = "center";
        }, 1);

      }, 250);

    }

  }

  nextQuestion() {

    if (this.actualIndex != this.questions.length - 1) {

      this.transition = "right";
      let pivotIndex = this.actualIndex;

      setTimeout(() => {
        this.actualIndex = -1;
        this.actualIndex = pivotIndex + 1;
        this.visible = false;

        setTimeout(() => {
          this.visible = true;
          this.transition = "center";
        }, 1);

      }, 250);

    }

  }


  sendQuestions() {

  }

  startQuestions() {
    this.start = true;
  }

}
