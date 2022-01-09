import { Component, OnInit } from "@angular/core";
import { Router } from '@angular/router';
import { BackendService } from "../services/backend.service";
import { NotifierService } from "angular-notifier";
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { CustomValidators } from 'ngx-custom-validators';


@Component({
  selector: "app-register",
  templateUrl: "register.component.html",
  styleUrls:["register.component.scss"]
})
export class RegisterComponent implements OnInit {
  focus;
  focus1;
  imageSrc5="assets/img/img5.png";
  imageSrc6="assets/img/img6.png";
  public hincha: any;
  private readonly notifier: NotifierService;

  valForm: FormGroup;

  constructor(private backendService: BackendService,
              public notifierService: NotifierService,
              private router: Router,
              fb: FormBuilder) {
    this.notifier = notifierService;
    this.valForm = fb.group({
      'email': [null, Validators.compose([Validators.required, CustomValidators.email])],
      'nombre': [null, Validators.required],
      'apellido': [null, Validators.required],
      'numero': [null, Validators.required],
      'cedula': [null, Validators.required]
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
      cedula: ''
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
      const hincha = {
          email: this.valForm.value.email,
          nombre: this.valForm.value.nombre, 
          apellido: this.valForm.value.apellido,
          cedula: this.valForm.value.cedula,
          numero: this.valForm.value.numero
      };
      this.backendService.createHincha(hincha).subscribe(data => {
        if (data.success) { 
          //this.router.navigate(['/stream/' + data.id])
          this.router.navigate(['/finish'])
        } else {
          this.notifier.notify("error", "Error en el registro");
        }
      })
    }
  }

  ngOnDestroy() {
    var body = document.getElementsByTagName("body")[0];
    body.classList.remove("register-page");
  }
}
