import { Component, OnInit } from '@angular/core';
import {  Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-eventscalender',
  templateUrl: './eventscalender.component.html',
  styleUrls: ['./eventscalender.component.scss']
})
export class EventscalenderComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }
 
  
  @Input()
  view: string;

  @Input()
  viewDate: Date;

  @Input()
  locale: string = 'en';

  @Output()
  viewChange: EventEmitter<string> = new EventEmitter();

  @Output()
  viewDateChange: EventEmitter<Date> = new EventEmitter();

}
