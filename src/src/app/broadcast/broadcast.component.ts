import { Component, OnInit, OnDestroy, ChangeDetectorRef } from "@angular/core";
import { ActivatedRoute} from '@angular/router';
import { Router } from '@angular/router';
import { NgxAgoraService } from 'ngx-agora';

@Component({
  selector: "app-broadcast",
  templateUrl: "broadcast.component.html",
  styleUrls:["broadcast.component.scss"]
})
export class BroadcastComponent implements OnInit {

  imageSrc1="assets/img/cnt.png";
  camera = {
    id: 0,
    name: "Cámara"
  };
  quality = {
    id: 0,
    name: "Calidad"
  };
  data = [];

  data1 = [ {id: "480p_3", name: "480p"},
            {id: "720p_3", name: "720p"},
            {id: "1080p_1", name: "1080p 1"},
            {id: "1080p_2", name: "1080p 2"},
            {id: "1080p_3", name: "1080p 3"},
            {id: "1080p_5", name: "1080p 5"},
            {id: "1440p", name: "1440p"},
            {id: "1440p", name: "1440p 1"},
            {id: "1440p", name: "1440p 2"},
            {id: "4K_1", name: "4K 1"},
            {id: "4K_3", name: "4K 3"},
          ];
  
  config = {
    displayKey:"name",
    search:false, 
    height: 'auto', 
    placeholder:'Camara',
  }

  config1 = {
    displayKey:"name",
    search:false, 
    height: 'auto', 
    placeholder:'Calidad',
  }

  constructor(public route: ActivatedRoute,
              private cdr: ChangeDetectorRef,
              private agoraService: NgxAgoraService,
              private router: Router) {
    this.agoraService.createClient({ mode: 'live', codec: 'vp8' });
  } 
  
  public id = this.route.snapshot.params['id'];

  ngOnInit() {
    
    this.agoraService.client.getCameras((devices) => {
      for(let i=0; i<devices.length;i++){
        this.data.push({ id: devices[i].deviceId, name: devices[i].label })
      }
    });
    var body = document.getElementsByTagName("body")[0];
    body.classList.add("broadcast-page");
  }

  stream(){
    
    this.agoraService.client.setClientRole('host');
    this.agoraService.client.join('00633c2d8d666114b62a5b8a37bc9cfe6f0IACkZcpyBAZPrO2HvOwyWFz5ICG6j7C6wOaswtN9lYJUZabLuwcAAAAAEABoKgnHs3MpYAEAAQCycylg', 'liga', null, (uid) => {
      
      let localStream = this.agoraService.createStream({
        audio: true,
        video: true,
        cameraId: this.camera.id.toString()
      });
      let quality: any = this.quality.id;
      localStream.setVideoProfile(quality);
      localStream.init(() => {
        console.log("getUserMedia successfully");
        //localStream.play('remote-container');
        this.agoraService.client.publish(localStream, function (err) {
          console.log("Publish local stream error: " + err);
        });
      }, function (err) {
        console.log("getUserMedia failed", err);
      });
    });
  }

  ngAfterViewChecked(){
    this.cdr.detectChanges();
  }

  select(obj){
    this.camera = obj;
  }

  select1(obj){
    this.quality = obj;
  }

  ngOnDestroy() {
    var body = document.getElementsByTagName("body")[0];
    body.classList.remove("broadcast-page");
  }

  back(){
    this.router.navigate(['/record/' + this.id])
  }
}
