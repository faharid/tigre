import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";

//LOCAL STORAGE
import { LocalStorageService } from 'ngx-webstorage';


@Component({
  selector: "app-navbar",
  templateUrl: "./navbar.component.html",
  styleUrls: ["./navbar.component.scss"]
})
export class NavbarComponent implements OnInit {

  path = "";
  isCollapsed = true;
  autoclose = false;

  //AUDIO
  audio = new Audio();
  audioStarted = false;
  songs = ["Don't Stop Me Now", "We Will Rock You", "Another One Bites the Dust"];
  actualSongIndex = 0;
  previousSongIndex = 0;
  preloadedSongs = 0;

  homeRoutes = ["/home", "/login", "/register", "/exit"];
  concursoRoute = ["/concurso"];
  actualRouteSection = "";



  constructor(private router: Router,
    private localStorage: LocalStorageService,
  ) {

    router.events.subscribe(val => {
      this.autoclose = true;
      this.isCollapsed = true;
      this.path = window.location.pathname;

      if (this.homeRoutes.includes(this.path)) {
        this.actualSongIndex = 0;
      }

      if (!this.homeRoutes.includes(this.path)) {

        if (this.concursoRoute.includes(this.path)) {
          this.actualSongIndex = 2;
        } else {
          this.actualSongIndex = 1;
        }

      }


      if (this.path != "/live") {
        this.playAudio();

      } else {
        this.audio.pause();
      }


    });
  }


  ngOnInit() {

    this.path = window.location.pathname;

    if (this.homeRoutes.includes(window.location.pathname)) {
      this.actualRouteSection = "Home";
    } else {

      if (this.concursoRoute.includes(window.location.pathname)) {
        this.actualRouteSection = "Concurso";
      } else {
        this.actualRouteSection = "Main";
      }

    }

    this.audio.src = "assets/audio/" + this.songs[this.actualSongIndex] + ".mp3";
    this.audio.load();
    this.audio.volume = 0.10;

    for (var song of this.songs) {
      this.preloadAudio("assets/audio/" + song + ".mp3");
    }

  }


  getToken() {
    if (this.localStorage.retrieve('token') != null) {
      return this.localStorage.retrieve('token');
    }
    return null;
  }

  logout() {
    this.clearToken();
    this.goToHome();
  }

  clearToken() {
    this.localStorage.clear('token');
  }

  goToHome(): void {
    this.router.navigateByUrl("/home");
  }

  playerClicked() {

    if (this.audio.paused) {
      this.audio.play();
    } else {
      this.audio.pause();
    }
  }

  playAudio() {

    if (this.actualSongIndex != this.previousSongIndex) {
      this.audio.src = "assets/audio/" + this.songs[this.actualSongIndex] + ".mp3";
      this.audio.load();
      this.audio.play();
      this.previousSongIndex = this.actualSongIndex;
    }

  }



  preloadAudio(url) {
    var audioPreloader = new Audio();
    audioPreloader.addEventListener('canplaythrough', null, false);
    audioPreloader.src = url;
  }

}
