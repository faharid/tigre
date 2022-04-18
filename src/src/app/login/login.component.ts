import { Component, OnInit } from "@angular/core";
import { Router } from '@angular/router';
import { NotifierService } from "angular-notifier";
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { CustomValidators } from 'ngx-custom-validators';

//LOCAL STORAGE
import { LocalStorageService } from 'ngx-webstorage';

//APIS
import { HttpClient, HttpHeaders, HttpResponse, HttpRequest } from '@angular/common/http';
import 'rxjs/add/operator/take';
import { environment } from "../../environments/environment";

//ALERTS
import Swal from 'sweetalert2'

@Component({
  selector: "app-login",
  templateUrl: "./login.component.html",
  styleUrls: ["./login.component.scss", "../app.component.scss"]
})
export class LoginComponent implements OnInit {
  focus;
  focus1;
  imageSrc5 = "assets/img/img5.png";
  imageSrc6 = "assets/img/img6.png";
  public hincha: any;
  private readonly notifier: NotifierService;

  valForm: FormGroup;


  constructor(public notifierService: NotifierService,
    private router: Router,
    fb: FormBuilder,
    private http: HttpClient,
    private localStorage: LocalStorageService,
  ) {
    this.notifier = notifierService;
    this.valForm = fb.group({
      'email': [null, Validators.compose([Validators.required, CustomValidators.email])],
      'password': [null, Validators.required],
    });
  }

  scrollToDownload(element: any) {
    element.scrollIntoView({ behavior: "smooth" });
  }

  ngOnInit() {
    this.valForm.setValue({
      email: '',
      password: ''
    })
    var body = document.getElementsByTagName("body")[0];
    body.classList.add("register-page");

  }

  submitForm($ev, value: any) {
    $ev.preventDefault();
    for (let c in this.valForm.controls) {
      this.valForm.controls[c].markAsTouched();
    }
    if (this.valForm.valid) {

      const user = {
        email: this.valForm.get("email").value,
        password: this.valForm.get("password").value
      };


      this.http.post(environment.api_url + '/users/login', user)
        .subscribe(Response => {
          var data: any;
          data = Response;

          if (data.access_token) {
            this.saveToken(data.access_token);
            this.goToMain();
          } else {
            console.log(data.msg);
          }

        },
          (error) => {
            console.log(error);

            Swal.fire({
              title: 'Error!',
              text: error.error.msg,
              icon: 'error',
              confirmButtonText: 'Ok'
            })

          }

        );


    }
  }

  ngOnDestroy() {
    var body = document.getElementsByTagName("body")[0];
    body.classList.remove("register-page");
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
    this.router.navigateByUrl("/line-up");
  }




}
