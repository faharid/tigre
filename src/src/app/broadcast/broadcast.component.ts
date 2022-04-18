import { Component, OnInit, OnDestroy, ChangeDetectorRef } from "@angular/core";
import { NgxAgoraService } from 'ngx-agora';
//AGORA TOKEN
const { RtcTokenBuilder, RtmTokenBuilder, RtcRole, RtmRole } = require('agora-access-token')

@Component({
  selector: "app-broadcast",
  templateUrl: "broadcast.component.html",
  styleUrls: ["broadcast.component.scss", "../app.component.scss"]
})
export class BroadcastComponent implements OnInit {

  //BROADCAST
  camera = {
    id: 0,
    name: "Cámara"
  };
  quality = {
    id: 0,
    name: "Calidad"
  };
  data = [];

  data1 = [{ id: "480p_3", name: "480p" },
  { id: "720p_3", name: "720p" },
  { id: "1080p_1", name: "1080p 1" },
  { id: "1080p_2", name: "1080p 2" },
  { id: "1080p_3", name: "1080p 3" },
  { id: "1080p_5", name: "1080p 5" },
  { id: "1440p", name: "1440p" },
  { id: "1440p", name: "1440p 1" },
  { id: "1440p", name: "1440p 2" },
  { id: "4K_1", name: "4K 1" },
  { id: "4K_3", name: "4K 3" },
  ];

  config = {
    displayKey: "name",
    search: false,
    height: 'auto',
    placeholder: 'Camara',
  }

  config1 = {
    displayKey: "name",
    search: false,
    height: 'auto',
    placeholder: 'Calidad',
  }

  constructor(
    private cdr: ChangeDetectorRef,
    private agoraService: NgxAgoraService) {
    this.agoraService.createClient({ mode: 'live', codec: 'vp8' });
  }


  ngOnInit() {

    this.agoraService.client.getCameras((devices) => {
      for (let i = 0; i < devices.length; i++) {
        this.data.push({ id: devices[i].deviceId, name: "Cámara " + (i + 1) })
      }
    });

  }

  stream() {

    this.agoraService.client.setClientRole('host');

    this.agoraService.client.join("dd3247ba803b47e4a5d55658b7a816f4", 'Broadcast', null, (uid) => {

      let localStream = this.agoraService.createStream({
        audio: true,
        video: true,
        cameraId: this.camera.id.toString()
      });
      let quality: any = this.quality.id;
      localStream.setVideoProfile(quality);
      localStream.init(() => {
        console.log("getUserMedia successfully");
        localStream.play('remote-container');
        this.agoraService.client.publish(localStream, function (err) {
          console.log("Publish local stream error: " + err);
        });
      }, function (err) {
        console.log("getUserMedia failed", err);
      });
    });
  }

  ngAfterViewChecked() {
    this.cdr.detectChanges();
  }

  select(obj) {
    this.camera = obj;
  }

  select1(obj) {
    this.quality = obj;
  }


  /*
  back() {
    this.router.navigate(['/record/' + this.id])
  }
  */

  getToken() {

    // Rtc Examples
    const appID = '0494621b36bb4145b89d8110bff4732e';
    const appCertificate = '3b06f715a98345e08eff9988d3fb11eb';
    const channelName = 'test';
    const uid = 2882341273;
    const account = "2882341273";
    const role = RtcRole.PUBLISHER;

    const expirationTimeInSeconds = 3600;
    const currentTimestamp = Math.floor(Date.now() / 1000);
    const privilegeExpiredTs = currentTimestamp + expirationTimeInSeconds;

    console.log("Uid: " + uid);
    console.log("account: " + account);
    console.log("role: " + role);
    console.log("expirationTimeInSeconds: " + expirationTimeInSeconds);
    console.log("currentTimestamp: " + currentTimestamp);
    console.log("privilegeExpiredTs: " + privilegeExpiredTs);

    // IMPORTANT! Build token with either the uid or with the user account. Comment out the option you do not want to use below.

    // Build token with uid
    let tokenA = RtcTokenBuilder.buildTokenWithUid(appID, appCertificate, channelName, uid, role, privilegeExpiredTs);
    console.log("Token With Integer Number Uid: " + tokenA);


    const token = RtmTokenBuilder.buildToken(appID, appCertificate, account, role, privilegeExpiredTs);
    console.log("Token With Integer Number Uid: " + token);

    // Build token with user account
    const tokenB = RtcTokenBuilder.buildTokenWithAccount(appID, appCertificate, channelName, account, role, privilegeExpiredTs);
    console.log("Token With UserAccount: " + tokenB);


    return token;

  }

  getRandomInt(min, max): number {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }


}
