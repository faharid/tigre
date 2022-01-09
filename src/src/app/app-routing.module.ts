import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { HomeComponent } from "./home/home.component";
import { LiveComponent } from "./live/live.component";
import { RegisterComponent } from "./register/register.component";
import { FinishComponent } from "./finish/finish.component";
import { StreamComponent } from "./stream/stream.component";
import { BroadcastComponent } from "./broadcast/broadcast.component";
import { AuthGuard } from './services/guards/auth.guard';

const routes: Routes = [
  { path: '', redirectTo: 'finish', pathMatch: 'full' },
  //{ path: 'home', component: HomeComponent },
  //{ path: 'live', component: LiveComponent },
  //{ path: 'register', component: RegisterComponent },
  { path: 'finish', component: FinishComponent },
  //{ path: 'stream', component: StreamComponent },
  //{ path: 'broadcast', component: BroadcastComponent },
  { path: '**', redirectTo: 'finish', pathMatch: "full"}
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { 
      useHash: false,
      scrollPositionRestoration: "enabled",
      anchorScrolling: "enabled",
      scrollOffset: [0, 64]
    })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {}
