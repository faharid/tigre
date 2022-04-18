import { Component, OnInit } from "@angular/core";
import { ActivatedRoute} from '@angular/router';
import { Router } from '@angular/router';
import { NgxAgoraService, Stream, AgoraClient, ClientEvent } from 'ngx-agora';

@Component({
  selector: "app-stream",
  templateUrl: "stream.component.html",
  styleUrls:["stream.component.scss"]
})
export class StreamComponent implements OnInit {

  imageSrc1="assets/img/cnt.png";
  localCallId = 'agora_local';

  private client: AgoraClient;
  private localStream: Stream;
  private uid: number;
  remoteCalls: string[] = [];

  constructor(public route: ActivatedRoute,
              private agoraService: NgxAgoraService,
              private router: Router) {
    
  } 
  
  public id = this.route.snapshot.params['id'];
  public chanel = Math.floor(Math.random() * 100);
  ngOnInit() {

    this.client = this.agoraService.createClient({ mode: 'live', codec: 'vp8' });
    this.agoraService.client.setClientRole('audience');
    this.assignClientHandlers();

    this.agoraService.client.join('0060494621b36bb4145b89d8110bff4732eIAC56vWrY8aMhblTlgO8Y9KuJnvYdgFkCJPHukoU98OGaQx+f9gAAAAAEADC8VeAzQDiYQEAAQDNAOJh', 'test', null, (uid) => {
    })
    
    var body = document.getElementsByTagName("body")[0];
    body.classList.add("stream-page");
  }

  join(onSuccess?: (uid: number | string) => void, onFailure?: (error: Error) => void): void {
    //this.client.join('00633c2d8d666114b62a5b8a37bc9cfe6f0IADsUxVfDYziWVnsnU4YQphb/xHdDxncAnZal+xkKvHPqqbLuwcAAAAAEABoKgnHlCAoYAEAAQCTIChg', 'liga', this.uid, onSuccess, onFailure);
  }

  publish(): void {
    this.client.publish(this.localStream, err => console.log('Publish local stream error: ' + err));
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
      const id = this.getRemoteId(stream);
      if (!this.remoteCalls.length) {
        this.remoteCalls.push(id);
        setTimeout(() => stream.play(id), 1000);
      }
    });

    this.client.on(ClientEvent.RemoteStreamRemoved, evt => {
      const stream = evt.stream as Stream;
      if (stream) {
        stream.stop();
        this.remoteCalls = [];
        console.log(`Remote stream is removed ${stream.getId()}`);
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

  private getRemoteId(stream: Stream): string {
    return `agora_remote-${stream.getId()}`;
  }

  ngOnDestroy() {
    var body = document.getElementsByTagName("body")[0];
    body.classList.remove("stream-page");
  }

  back(){
    this.router.navigate(['/record/' + this.id])
  }
}
