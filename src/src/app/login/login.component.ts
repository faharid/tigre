import { Component, OnInit } from "@angular/core";
import { Router } from '@angular/router';
import { NotifierService } from "angular-notifier";
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { CustomValidators } from 'ngx-custom-validators';

//LOCAL STORAGE
import { LocalStorageService } from 'ngx-webstorage';
import { environment } from "../../environments/environment";

//APIS
import { HttpClient } from '@angular/common/http';


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

      console.log(user);

      this.http.post(environment.api_url + '/users/login', user)
        .subscribe(Response => {
          var data: any;
          data = Response;
          console.log(data);
        });


      //this.saveToken("12345678");
      //this.goToMain();

    }
  }

  ngOnDestroy() {
    var body = document.getElementsByTagName("body")[0];
    body.classList.remove("register-page");
  }

  saveToken(token: string) {

    console.log("HOLA");

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
