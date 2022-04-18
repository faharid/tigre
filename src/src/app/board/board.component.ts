import {
  Component,
  Input,
  ElementRef,
  AfterViewInit, OnInit,
  ViewChild,
} from '@angular/core';
import { fromEvent, Observable, Subscription } from 'rxjs';
import { switchMap, takeUntil, pairwise } from 'rxjs/operators';
import { timer } from 'rxjs';

@Component({
  selector: 'app-board',
  templateUrl: './board.component.html',
  styleUrls: ['./board.component.scss']
})
export class BoardComponent implements OnInit, AfterViewInit {
  @ViewChild('canvas') public canvas: ElementRef | undefined;
  @Input() public width = 900;
  @Input() public height = 500;

  private canvasEl: HTMLCanvasElement;
  private cx: CanvasRenderingContext2D | null | undefined;
  images = [];
  colors = ["blue", "red", "black", "brown", "yellow", "blueviolet", "darkblue", "chocolate", "darkmagenta", "darkgreen", "dodgerblue", "forestgreen", "navy", "steelblue", "tomato"];


  //MIRO
  resizeObservable$: Observable<Event>
  resizeSubscription$: Subscription

  @ViewChild('board') boardElement: ElementRef;
  @ViewChild('ipad') ipadElement: ElementRef;

  boardHeight: number;
  boardWidth: number;


  public ngOnInit() {

    //setInterval(() => { this.reloadImages() }, 1 * 1000);

    this.resizeObservable$ = fromEvent(window, 'resize')
    this.resizeSubscription$ = this.resizeObservable$.subscribe(evt => {
      let height = this.ipadElement.nativeElement.offsetHeight;
      let width = this.ipadElement.nativeElement.offsetWidth;

      this.boardHeight = height;
      this.boardWidth = width;
    })

  }

  public ngAfterViewInit() {

    timer(1000).subscribe(x => {
      let height = this.ipadElement.nativeElement.offsetHeight;
      let width = this.ipadElement.nativeElement.offsetWidth;

      this.boardHeight = height;
      this.boardWidth = width;

    });

    this.canvasEl = this.canvas?.nativeElement;

    this.cx = this.canvasEl.getContext('2d');

    this.canvasEl.width = this.width;
    this.canvasEl.height = this.height;

    if (!this.cx) throw 'Cannot get context';

    this.cx.lineWidth = 3;
    this.cx.lineCap = 'round';
    //this.cx.strokeStyle = '#000';
    this.cx.strokeStyle = this.colors[this.getRandomInt(0, this.colors.length - 1)];

    this.captureEvents(this.canvasEl);
  }

  private captureEvents(canvasEl: HTMLCanvasElement) {
    // this will capture all mousedown events from the canvas element
    fromEvent(canvasEl, 'mousedown')
      .pipe(
        switchMap(e => {
          // after a mouse down, we'll record all mouse moves
          return fromEvent(canvasEl, 'mousemove').pipe(
            // we'll stop (and unsubscribe) once the user releases the mouse
            // this will trigger a 'mouseup' event
            takeUntil(fromEvent(canvasEl, 'mouseup')),
            // we'll also stop (and unsubscribe) once the mouse leaves the canvas (mouseleave event)
            takeUntil(fromEvent(canvasEl, 'mouseleave')),
            // pairwise lets us get the previous value to draw a line from
            // the previous point to the current point
            pairwise()
          );
        })
      )
      .subscribe((res) => {
        const rect = canvasEl.getBoundingClientRect();
        const prevMouseEvent = res[0] as MouseEvent;
        const currMouseEvent = res[1] as MouseEvent;

        // previous and current position with the offset
        const prevPos = {
          x: prevMouseEvent.clientX - rect.left,
          y: prevMouseEvent.clientY - rect.top
        };

        const currentPos = {
          x: currMouseEvent.clientX - rect.left,
          y: currMouseEvent.clientY - rect.top
        };

        // this method we'll implement soon to do the actual drawing
        this.drawOnCanvas(prevPos, currentPos);

      });



    fromEvent(canvasEl, 'mouseup')
      .subscribe((res) => {
        this.storeImage();
      });


  }

  private drawOnCanvas(
    prevPos: { x: number; y: number },
    currentPos: { x: number; y: number }
  ) {
    if (!this.cx) {
      return;
    }

    this.cx.beginPath();

    if (prevPos) {
      this.cx.moveTo(prevPos.x, prevPos.y); // from
      this.cx.lineTo(currentPos.x, currentPos.y);
      this.cx.stroke();
      //this.cx.strokeStyle = this.colors[this.getRandomInt(0, this.colors.length - 1)];
    }
  }

  saveImage() {
    var canvasDataUrl = this.canvasEl.toDataURL()
      .replace(/^data:image\/[^;]*/, 'data:application/octet-stream');
    var link = document.createElement('a'); // create an anchor tag

    // set parameters for downloading
    link.setAttribute('href', canvasDataUrl);
    link.setAttribute('target', '_blank');
    link.setAttribute('download', "image.png");

    // compat mode for dispatching click on your anchor
    if (document.createEvent) {
      var evtObj = document.createEvent('MouseEvents');
      evtObj.initEvent('click', true, true);
      link.dispatchEvent(evtObj);
    } else if (link.click) {
      link.click();
    }
  }


  storeImage() {
    var canvasDataUrl = this.canvasEl.toDataURL();
    this.images.push(canvasDataUrl);
    this.cx.clearRect(0, 0, this.canvasEl.width, this.canvasEl.height);
    //console.log(this.images);
  }


  reloadImages() {
    console.log("Reloading images");
    //this.images = [];
  }


  getRandomInt(min, max): number {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }

}
