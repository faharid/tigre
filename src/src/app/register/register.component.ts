import { Component, OnInit } from "@angular/core";
import { Router } from '@angular/router';
import { NotifierService } from "angular-notifier";
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { CustomValidators } from 'ngx-custom-validators';

//APIS
import { HttpClient } from '@angular/common/http';
import { environment } from "../../environments/environment";

//LOCAL STORAGE
import { LocalStorageService } from 'ngx-webstorage';

//ALERTS
import Swal from 'sweetalert2'

@Component({
  selector: "app-register",
  templateUrl: "register.component.html",
  styleUrls: ["register.component.scss", "../app.component.scss"]
})
export class RegisterComponent implements OnInit {
  focus;
  focus1;
  imageSrc5 = "assets/img/img5.png";
  imageSrc6 = "assets/img/img6.png";
  public hincha: any;
  private readonly notifier: NotifierService;
  valForm: FormGroup;



  constructor(
    private router: Router,
    public notifierService: NotifierService,
    private http: HttpClient,
    fb: FormBuilder,
    private localStorage: LocalStorageService,
  ) {

    this.notifier = notifierService;
    this.valForm = fb.group({
      'email': [null, Validators.compose([Validators.required, CustomValidators.email])],
      'nombre': [null, Validators.required],
      'apellido': [null, Validators.required],
      'numero': [null, Validators.required],
      'cedula': [null, Validators.required],
      'password': [null, Validators.required]
    });

  }

  scrollToDownload(element: any) {
    element.scrollIntoView({ behavior: "smooth" });
  }

  ngOnInit() {
    this.valForm.setValue({
      email: '',
      nombre: '',
      apellido: '',
      numero: '',
      cedula: '',
      password: ''

    })
    var body = document.getElementsByTagName("body")[0];
    body.classList.add("register-page");

    //SEATS
    const seatsContainer = document.querySelector('.seats-container') as HTMLInputElement;
    const seats = document.querySelectorAll('.row .seat:not(.occupied)');
    seatsContainer.addEventListener('click', e => {
      if ((e.target as HTMLInputElement).classList.contains('seat') &&
        !(e.target as HTMLInputElement).classList.contains('occupied')) {
        (e.target as HTMLInputElement).classList.toggle('selected');
      }
    });


  }

  submitForm($ev, value: any) {
    $ev.preventDefault();
    for (let c in this.valForm.controls) {
      this.valForm.controls[c].markAsTouched();
    }
    if (this.valForm.valid) {
      const user = {
        email: this.valForm.value.email,
        password: this.valForm.value.password,
        nombre: this.valForm.value.nombre,
        apellido: this.valForm.value.apellido,
        cedula: this.valForm.value.cedula,
        numero: this.valForm.value.numero,
      };


      this.http.put(environment.api_url + '/users', user)
        .subscribe(Response => {
          var data: any;
          data = Response;
          console.log(data);

          if (data.id) {

            this.saveToken(data.id);
            this.goToMain();

          } else {

            Swal.fire({
              title: 'Mensaje',
              text: data.msg,
              icon: 'warning',
              confirmButtonText: 'Ok'
            })

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


  goToMain(): void {
    this.router.navigateByUrl("/line-up");
  }

}
