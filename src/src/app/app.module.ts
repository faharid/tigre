import { BrowserModule } from "@angular/platform-browser";
import { HttpClientModule } from '@angular/common/http';
import { TagInputModule } from "ngx-chips";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { NgModule } from "@angular/core";
import { RouterModule } from "@angular/router";
import { CommonModule } from "@angular/common";
import { NgxAgoraModule, AgoraConfig } from 'ngx-agora';

import { BsDropdownModule } from "ngx-bootstrap/dropdown";
import { ProgressbarModule } from "ngx-bootstrap/progressbar";
import { TooltipModule } from "ngx-bootstrap/tooltip";
import { CollapseModule } from "ngx-bootstrap/collapse";
import { TabsModule } from "ngx-bootstrap/tabs";
import { PaginationModule } from "ngx-bootstrap/pagination";
import { AlertModule } from "ngx-bootstrap/alert";
import { BsDatepickerModule } from "ngx-bootstrap/datepicker";
import { CarouselModule } from "ngx-bootstrap/carousel";
import { ModalModule } from "ngx-bootstrap/modal";
import { JwBootstrapSwitchNg2Module } from "jw-bootstrap-switch-ng2";
import { PopoverModule } from "ngx-bootstrap/popover";
import { AngularMultiSelectModule } from "angular2-multiselect-dropdown";
import { TimepickerModule } from "ngx-bootstrap/timepicker";
import { CustomFormsModule } from 'ngx-custom-validators';
import { SelectDropDownModule } from 'ngx-select-dropdown';

import { LazyLoadImageModule } from 'ng-lazyload-image';

import { AppRoutingModule } from "./app-routing.module";
import { AppComponent } from "./app.component";
import { BackendService } from "./services/backend.service";
import { AuthGuard } from './services/guards/auth.guard';

import { HomeComponent } from "./home/home.component";
import { StreamComponent } from "./stream/stream.component";
import { BroadcastComponent } from "./broadcast/broadcast.component";
import { LiveComponent } from "./live/live.component";
import { FinishComponent } from "./finish/finish.component";
import { RegisterComponent } from "./register/register.component";
import { NotifierModule, NotifierOptions } from "angular-notifier";
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { NavbarComponent } from "./navbar/navbar.component";

//LOCAL STORAGE
import { NgxWebstorageModule } from 'ngx-webstorage';
import { LoginComponent } from './login/login.component';
import { ConcursoComponent } from './concurso/concurso.component';

//MATERIAL
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatRadioModule } from '@angular/material/radio';
import { BoardComponent } from './board/board.component';
import { LineUpComponent } from './line-up/line-up.component';
import { MatTableModule } from '@angular/material/table';

//CHAT
import { ChatService } from './services/chat.service';

//FIREBASE
import { AngularFireModule } from 'angularfire2';
import { AngularFireDatabaseModule } from 'angularfire2/database';
import { AngularFireAuthModule } from 'angularfire2/auth';

//FIREBASE ENVIROMENT
import { environment } from 'src/environments/environment';

const customNotifierOptions: NotifierOptions = {
  position: {
    horizontal: {
      position: 'right',
      distance: 12
    },
    vertical: {
      position: 'top',
      distance: 12,
      gap: 10
    }
  },
  //theme: 'material',
  behaviour: {
    autoHide: 3000,
    onClick: 'hide',
    onMouseover: 'pauseAutoHide',
    showDismissButton: true,
    stacking: 4
  },
  animations: {
    enabled: true,
    show: {
      preset: 'slide',
      speed: 300,
      easing: 'ease'
    },
    hide: {
      preset: 'fade',
      speed: 300,
      easing: 'ease',
      offset: 50
    },
    shift: {
      speed: 300,
      easing: 'ease'
    },
    overlap: 150
  }
};

const agoraConfig: AgoraConfig = {
  AppID: 'dd3247ba803b47e4a5d55658b7a816f4',
};

@NgModule({
  declarations: [
    HomeComponent,
    StreamComponent,
    LiveComponent,
    BroadcastComponent,
    RegisterComponent,
    FinishComponent,
    AppComponent,
    NavbarComponent,
    LoginComponent,
    ConcursoComponent,
    BoardComponent,
    LineUpComponent,
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    CommonModule,
    FormsModule,
    SelectDropDownModule,
    RouterModule,
    LazyLoadImageModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    BsDropdownModule.forRoot(),
    ProgressbarModule.forRoot(),
    TooltipModule.forRoot(),
    TimepickerModule.forRoot(),
    PopoverModule.forRoot(),
    CollapseModule.forRoot(),
    TagInputModule,
    JwBootstrapSwitchNg2Module,
    AngularMultiSelectModule,
    TabsModule.forRoot(),
    PaginationModule.forRoot(),
    AlertModule.forRoot(),
    BsDatepickerModule.forRoot(),
    CarouselModule.forRoot(),
    ModalModule.forRoot(),
    NotifierModule.withConfig(customNotifierOptions),
    NgxAgoraModule.forRoot(agoraConfig),
    CustomFormsModule,
    FormsModule,
    ReactiveFormsModule,
    NgxWebstorageModule.forRoot(),
    MatCardModule,
    MatButtonModule,
    MatCheckboxModule,
    MatRadioModule,
    AngularFireModule,
    AngularFireAuthModule,
    AngularFireDatabaseModule,
    AngularFireModule.initializeApp(environment.firebase),
    MatTableModule
  ],
  providers: [BackendService,
    AuthGuard, ChatService],
  bootstrap: [AppComponent]
})
export class AppModule { }
