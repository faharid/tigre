import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-line-up',
  templateUrl: './line-up.component.html',
  styleUrls: ['./line-up.component.scss', "../app.component.scss"]
})

export class LineUpComponent implements OnInit {

  displayedColumns: string[] = ['schedule-title', 'schedule-AR', 'schedule-BO', 'schedule-EC', 'schedule-USA', 'schedule-TIEMPO', 'schedule-SPEAKER'];
  dataSource = [
    { title: "BIENVENIDA", AR: '10:00', BO: '09:00', EC: '08:00', USA: '09:00', TIEMPO: '1 hora', SPEAKER: 'Andrés Miranda' },
    { title: "TENDENCIAS DIGITALES", AR: '10:00', BO: '09:00', EC: '08:00', USA: '09:00', TIEMPO: '1 hora', SPEAKER: 'Andrés Miranda' },
    { title: "TRADE MARKETING", AR: '10:00', BO: '09:00', EC: '08:00', USA: '09:00', TIEMPO: '1 hora', SPEAKER: 'Andrés Miranda' },

  ];

  constructor() { }

  ngOnInit(): void {
  }

}
