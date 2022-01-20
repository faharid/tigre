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


      //this.saveToken("61e37ae788e3c5cc0370d981");
      //this.goToMain();

      console.log(user);



      this.http.post(environment.api_url + '/users/login',user)
      .take(1) // optional: depending on your needs you could .take(x) this to just take a certain number of responses and then terminate the subscription in order to not have a "hot Observable" lying around
      .subscribe(response =>{
           console.log(response);
         // if I am not mistaken "response.headers" should contain the "Set-Cookie" you are looking for 
      });

      /*
      this.http
        .post<any>(environment.api_url + '/users/login', user, { observe: 'response' })
        .subscribe(resp => {
          console.log(resp);
          console.log(resp.headers.get('access_token'));
        });
*/

      /*
      this.http.post(environment.api_url + '/users/login', user)
        .subscribe(Response => {
          var data: any;
          data = Response;

          console.log(data);
          console.log(data.headers.get('X-Token'));

          //this.saveToken(data.token);
          //this.goToMain();

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
        */


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
