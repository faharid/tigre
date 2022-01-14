import { Component, OnInit, ChangeDetectorRef } from "@angular/core";
import { NgxAgoraService, Stream, AgoraClient, ClientEvent } from 'ngx-agora';

@Component({
  selector: "app-live",
  templateUrl: "live.component.html",
  styleUrls: ["live.component.scss", "../app.component.scss"]
})
export class LiveComponent implements OnInit {

  private client: AgoraClient;
  private localStream: Stream;
  playingStream: Stream;
  streamId = "";
  isPlaying = false;
  remoteCalls: string[] = [];


  //PUBLICO
  private clientPublico: AgoraClient;
  private localStreamPublico: Stream;
  playingStreamPublico: Stream;
  streamIdPublico = "";
  isPlayingPublico = false;
  remoteCallsPublico: string[] = [];

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
    private agoraService: NgxAgoraService,
    private agoraServicePublico: NgxAgoraService,
    private agoraServiceBroadcast: NgxAgoraService,
    private cdr: ChangeDetectorRef,
  ) {
    this.agoraService.createClient({
      mode: 'live', codec: 'vp8'
    })
  }


  //public id = this.route.snapshot.params['id'];
  //public chanel = Math.floor(Math.random() * 100);


  ngOnInit() {
    /*

    

    */
    this.agoraServiceBroadcast.client.getCameras((devices) => {
      for (let i = 0; i < devices.length; i++) {
        this.data.push({ id: devices[i].deviceId, name: "Cámara " + (i + 1) })
      }
      if (this.data.length > 0) {
        this.camera = this.data[0];
        this.stream();
      }


      this.client = this.agoraService.createClient({ mode: 'live', codec: 'vp8' });
      this.agoraService.client.setClientRole('audience');
      this.assignClientHandlers();
      this.agoraService.client.join('dd3247ba803b47e4a5d55658b7a816f4', 'Broadcast', null, (uid) => {
      });

      this.clientPublico = this.agoraServicePublico.createClient({ mode: 'live', codec: 'vp8' });
      this.agoraServicePublico.client.setClientRole('audience');
      this.assignClientHandlersPublico();
      this.agoraServicePublico.client.join('dd3247ba803b47e4a5d55658b7a816f4', 'Publico', null, (uid) => {
      });

    });




    /*
    this.agoraServicePublico.client.join('dd3247ba803b47e4a5d55658b7a816f4', 'Publico', null, (uid) => {
    });
    */

  }

  publish(): void {
    this.client.publish(this.localStream, err => console.log('Publish local stream error: ' + err));
  }

  publishPublico(): void {
    this.clientPublico.publish(this.localStreamPublico, err => console.log('Publish local stream error: ' + err));
  }

  private assignClientHandlers(): void {
    this.client.on(ClientEvent.LocalStreamPublished, evt => {
      console.log('Publish local stream successfully');
    });

    this.client.on(ClientEvent.Error, error => {
      console.log('Got error msg:', error.reason);
      if (error.reason === 'DYNAMIC_KEY_TIMEOUT') {
        this.client.renewChannelKey(
          '',
          () => console.log('Renewed the channel key successfully.'),
          renewError => console.error('Renew channel key failed: ', renewError)
        );
      }
    });

    this.client.on(ClientEvent.RemoteStreamAdded, evt => {
      const stream = evt.stream as Stream;
      this.client.subscribe(stream, { audio: true, video: true }, err => {
        console.log('Subscribe stream failed', err);
      });
    });

    this.client.on(ClientEvent.RemoteStreamSubscribed, evt => {
      const stream = evt.stream as Stream;
      this.playingStream = stream;
      const id = this.getRemoteId(stream);
      this.streamId = id;
      if (!this.remoteCalls.length) {
        this.remoteCalls.push(id);
        setTimeout(() => {
          stream.play(id)
        }, 1000);
      }

    });

    this.client.on(ClientEvent.RemoteStreamRemoved, evt => {
      const stream = evt.stream as Stream;
      if (stream) {
        stream.stop();
        this.remoteCalls = [];
        console.log(`Remote stream is removed ${stream.getId()}`);
        this.isPlaying = false;
      }
    });

    this.client.on(ClientEvent.PeerLeave, evt => {
      const stream = evt.stream as Stream;
      if (stream) {
        stream.stop();
        this.remoteCalls = this.remoteCalls.filter(call => call !== `${this.getRemoteId(stream)}`);
        console.log(`${evt.uid} left from this channel`);
      }
    });
  }


  private assignClientHandlersPublico(): void {
    this.clientPublico.on(ClientEvent.LocalStreamPublished, evt => {
      console.log('Publish local stream successfully');
    });

    this.clientPublico.on(ClientEvent.Error, error => {
      console.log('Got error msg:', error.reason);
      if (error.reason === 'DYNAMIC_KEY_TIMEOUT') {
        this.clientPublico.renewChannelKey(
          '',
          () => console.log('Renewed the channel key successfully.'),
          renewError => console.error('Renew channel key failed: ', renewError)
        );
      }
    });

    this.clientPublico.on(ClientEvent.RemoteStreamAdded, evt => {
      const stream = evt.stream as Stream;
      this.clientPublico.subscribe(stream, { audio: true, video: true }, err => {
        console.log('Subscribe stream failed', err);
      });
    });

    this.clientPublico.on(ClientEvent.RemoteStreamSubscribed, evt => {
      const stream = evt.stream as Stream;
      this.playingStreamPublico = stream;
      const id = this.getRemoteId(stream);
      this.streamIdPublico = id;
      if (!this.remoteCallsPublico.length) {
        this.remoteCallsPublico.push(id);
        setTimeout(() => {
          stream.play(id)
        }, 1000);
      }

    });

    this.clientPublico.on(ClientEvent.RemoteStreamRemoved, evt => {
      const stream = evt.stream as Stream;
      if (stream) {
        stream.stop();
        this.remoteCallsPublico = [];
        console.log(`Remote stream is removed ${stream.getId()}`);
        this.isPlayingPublico = false;
      }
    });

    this.clientPublico.on(ClientEvent.PeerLeave, evt => {
      const stream = evt.stream as Stream;
      if (stream) {
        stream.stop();
        this.remoteCallsPublico = this.remoteCallsPublico.filter(call => call !== `${this.getRemoteId(stream)}`);
        console.log(`${evt.uid} left from this channel`);
      }
    });
  }

  private getRemoteId(stream: Stream): string {
    return `agora_remote-${stream.getId()}`;
  }

  playStream() {
    if (this.playingStream) {
      this.isPlaying = true;
      this.playingStream.stop()
      this.playingStream.play(this.streamId);
    }

    if (this.playingStreamPublico) {
      this.isPlayingPublico = true;
      this.playingStreamPublico.stop()
      this.playingStreamPublico.play(this.streamIdPublico);
    }

  }



  //BROADCAST
  stream() {

    this.agoraServiceBroadcast.client.setClientRole('host');

    this.agoraServiceBroadcast.client.join("dd3247ba803b47e4a5d55658b7a816f4", 'Publico', null, (uid) => {

      let localStreamBroadcast = this.agoraServiceBroadcast.createStream({
        audio: true,
        video: true,
        cameraId: this.camera.id.toString()
      });
      let quality: any = "480p_3";
      localStreamBroadcast.setVideoProfile(quality);
      localStreamBroadcast.setAudioOutput("", () => {
      });
      localStreamBroadcast.setAudioVolume(0);
      localStreamBroadcast.muteAudio();

      localStreamBroadcast.init(() => {
        console.log("getUserMedia successfully");
        localStreamBroadcast.play('userCamera');
        this.agoraServiceBroadcast.client.publish(localStreamBroadcast, function (err) {
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


}
