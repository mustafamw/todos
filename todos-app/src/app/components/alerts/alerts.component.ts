import { Component, OnInit } from '@angular/core';
import { Alerts } from 'src/app/interfaces/alerts';

@Component({
  selector: 'app-alerts',
  templateUrl: './alerts.component.html',
  styleUrls: ['./alerts.component.scss']
})
export class AlertsComponent implements OnInit {

  public alerts: Array<Alerts> = [];

  constructor() { }

  appendMessages(alerts: Alerts){
    this.alerts.push(alerts);
  }

  remove(event: Event, index){
    this.alerts.splice(index, 1);
  }

  ngOnInit() {
  }

}
