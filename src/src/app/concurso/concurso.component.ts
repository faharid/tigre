import { Component, ViewChild, OnInit, ElementRef, HostListener, AfterViewInit } from "@angular/core";
import { NotifierService } from "angular-notifier";
import { FormControl, FormGroup, FormBuilder, Validators } from '@angular/forms';
import { trigger, transition, animate, style } from '@angular/animations'

//LOCAL STORAGE
import { LocalStorageService } from 'ngx-webstorage';

//APIS
import { HttpClient } from '@angular/common/http';
import { environment } from "../../environments/environment";

//ALERTS
import Swal from 'sweetalert2'

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

  response = [
    {
      "_id": "61e096c269031244ab132465",
      "index": 0,
      "question": "Quien es batman?",
      "options": [
        "Clark Kent",
        "Peter Parker",
        "Bruce Wayne",
        "Barry Allen"
      ],
      "answer": 2,
      "points": 10,
      "active": true,
      "__v": 0
    },
    {
      "_id": "61e096c269031244ab132465",
      "index": 1,
      "question": "Quien es batman?",
      "options": [
        "Clark Kent",
        "Peter Parker",
        "Bruce Wayne",
        "Barry Allen"
      ],
      "answer": 3,
      "points": 10,
      "active": false,
      "__v": 0
    },
    {
      "_id": "61e096c269031244ab132465",
      "index": 2,
      "question": "Quien es batman?",
      "options": [
        "Clark Kent",
        "Peter Parker",
        "Bruce Wayne",
        "Barry Allen"
      ],
      "answer": 1,
      "points": 10,
      "active": true,
      "__v": 0
    },

  ];


  questions = [];


  actualIndex = 0;
  longText = "The Shiba Inu is the smallest of the six original and distinct spitz breeds of dog from Japan. A small, agile dog that copes very well with mountainous terrain, the Shiba Inu was originally bred for hunting.";
  transition = "center";
  visible = true;
  start = false;
  showGanadores = false;
  answers = [];

  constructor(public notifierService: NotifierService,
    private http: HttpClient,
  ) {
  }

  ngOnInit() {
    var body = document.getElementsByTagName("body")[0];
    body.classList.add("home-page");

    this.http.get(environment.api_url + '/trivias')
      .subscribe(Response => {
        var data: any;
        data = Response;

        for (var i = 0; i < data.trivias.length; i++) {
          let form: FormGroup;
          form = new FormGroup(
            {
              selected: new FormControl("", [Validators.required])
            }
          )

          this.answers.push(form);
          this.questions.push(data.trivias[i]);

        }

      });

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
    let sendAnswers = [];
    for (var i = 0; i < this.answers.length; i++) {
      sendAnswers.push(this.answers[i].get("selected").value);
    }

    console.log(sendAnswers);
  }

  startQuestions() {
    this.start = true;
  }


}
