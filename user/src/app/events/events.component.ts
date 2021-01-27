import { Component, OnInit, Input, Output } from '@angular/core';
import {
  ChangeDetectionStrategy,
  ViewChild,
  TemplateRef
} from '@angular/core';
import {
  startOfDay,
  endOfDay,
  subDays,
  addDays,
  endOfMonth,
  isSameDay,
  isSameMonth,
  addHours
} from 'date-fns';
import { Subject } from 'rxjs';
import { NgbModal, NgbModalOptions, NgbModalRef, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';
import {
  CalendarEvent,
  CalendarEventAction,
  CalendarEventTimesChangedEvent,
  CalendarView
} from 'angular-calendar';
import { EventEmitter } from 'protractor';
import { EventscalenderComponent } from './eventscalender/eventscalender.component';
import { HttpService } from '../http.service';


const colors: any = {
  red: {
    primary: '#ad2121',
    secondary: '#FAE3E3'
  },
  blue: {
    primary: '#1e90ff',
    secondary: '#D1E8FF'
  },
  yellow: {
    primary: '#e3bc08',
    secondary: '#FDF1BA'
  }
};

@Component({
  selector: 'app-events',
  templateUrl: './events.component.html',
  styleUrls: ['./events.component.scss'],
  entryComponents: [ EventscalenderComponent ]
})
export class EventsComponent implements OnInit {
  formdata:any=[];
  title:string;
  primary:any;
  secondary;
  
  start;
  end;
  startdate;
  minDate;
  // modalData: { event: CalendarEvent<any>; action: string; };
  // @Input()
  // view: string;

  // @Input()
  // viewDate: Date;

  // @Input()
  // locale: string = 'en';


  ngOnInit(){
    
    this.getdata();
    this.addEvent();
  }
  @ViewChild('modalContent',{static:true}) modalContent: TemplateRef<any>;
  
  view: CalendarView = CalendarView.Month;

  CalendarView = CalendarView;

  viewDate: Date = new Date();
  modalData: { event: CalendarEvent; action: string; };

  
  actions: CalendarEventAction[] = [
    {
      label: '<i class="fa fa-fw fa-pencil"></i>',
      onClick: ({ event }: { event: CalendarEvent }): void => {
        this.handleEvent('Edited', event);
        console.log("pencil....")
      }
    },
    {
      label: '<i class="fa fa-fw fa-times"></i>',
      onClick: ({ event }: { event: CalendarEvent }): void => {
        this.events = this.events.filter(iEvent => iEvent !== event);
        this.handleEvent('Deleted', event);
      }
    }
  ];

  refresh: Subject<any> = new Subject();

  events: CalendarEvent[] = [
    {
      start: this.start,
      title: this.title,
      color: colors.yellow,
      actions: this.actions
    }
  ];

  activeDayIsOpen: boolean = true;

  constructor(private modal: NgbModal,private modalService:NgbModal,private ser:HttpService) {
    
    
  }
 

  dayClicked({ date, events }: { date: Date; events: CalendarEvent[] }): void {
    if (isSameMonth(date, this.viewDate)) {
      this.viewDate = date;
      if (
        (isSameDay(this.viewDate, date) && this.activeDayIsOpen === true) ||
        events.length === 0
      ) {
        this.activeDayIsOpen = false;
      } else {
        this.activeDayIsOpen = true;
      }
    }
  }

  eventTimesChanged({
    event,
    newStart,
    newEnd
  }: CalendarEventTimesChangedEvent): void {
    event.start = newStart;
    event.end = newEnd;
    this.handleEvent('Dropped or resized', event);
    this.refresh.next();
  }

  handleEvent(action: string, event: CalendarEvent): void {
    console.log(event,"handle event")
    this.modalData = { event, action };
    this.modal.open(this.modalContent, { size: 'sm' });
  }

/////
//this.modal.open(this.modalContent, { size: 'sm' });
  ////////
//   modalReference: NgbModalRef;       // modal popup refrence variable
// closeResult: string;         // modal pop up close string
// openLargeModalPopup(content) {
//   this.modalReference = this.modalService.open(content, { size: 'lg' });
//   this.modalReference.result.then((result: any) => {
//     this.closeResult = `Closed with: ${result}`;
//   }, (reason) => {
//     this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
//   });
// }
// openMediumModalPopup(content) {
//   let ngbModalOptions: NgbModalOptions = {
//     backdrop: 'static',
//     keyboard: false,
//   };
//   // console.log(this.startdate)
//   this.modalReference = this.modalService.open(content, ngbModalOptions);
//   this.modalReference.result.then((result: any) => {
//     this.closeResult = `Closed with: ${result}`;
//     console.log(result)
//   }, (reason) => {
//     this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
//   });
// }
// private getDismissReason(reason: any): string {
//   if (reason === ModalDismissReasons.ESC) {
//     return 'by pressing ESC';
//   }
//   else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
//     return 'by clicking on a backdrop';
//   } else {
//     return `with: ${reason}`;
//   }
// }

onSubmit(){
this.formdata=({
  "title":this.title,"primary":this.primary,"secondary":this.secondary,
  "start":this.start,"end":this.end
});
this.ser.postevent(this.formdata).subscribe(res=>{
  console.log("res",res);
  this.getdata2();
  
  

})

}

getdata2(){
  this.ser.getevent().subscribe((dt)=>{
   
   this.totaldata=dt;

   
   for(var i=0;i< this.totaldata.length;i++){
    this.title1=this.totaldata[i].title;
    this.start1=this.totaldata[i].start;
    this.end1=this.totaldata[i].end;
    this.primary=this.totaldata[i].primary
    this.secondary=this.totaldata[i].secondary
   
   var date = new Date( this.start1)
  var enddate=new Date(this.end1)


}
console.log("gh",this.title1)
   this.events = [
    ...this.events,
    {
      title:this.title1,
      start: startOfDay(date),
      end: endOfDay(enddate),
      color: colors.red,
      draggable: true,
      resizable: {
        beforeStart: true,
        afterEnd: true
      }
    }
  ];


  console.log(this.events);
  // this.addEvent();
   
  })
}



totaldata;title1;start1;end1;primary1;secondary1;
getdata(){
  this.ser.getevent().subscribe((dt)=>{
   
   this.totaldata=dt;

   
   for(var i=0;i< this.totaldata.length;i++){
    this.title1=this.totaldata[i].title;
    this.start1=this.totaldata[i].start;
    this.end1=this.totaldata[i].end;
    this.primary=this.totaldata[i].primary
    this.secondary=this.totaldata[i].secondary
   
   var date = new Date( this.start1)
  var enddate=new Date(this.end1)



console.log("gh",this.title1)
   this.events = [
    ...this.events,
    {
      title:this.title1,
      start: startOfDay(date),
      end: endOfDay(enddate),
      color: colors.red,
      draggable: true,
      resizable: {
        beforeStart: true,
        afterEnd: true
      }
    }
  ];
}

  console.log(this.events);
  // this.addEvent();
   
  })
}
  
 addEvent(): void {
  //  console.log(this.title1,this.start1,this.end1,"events data")
  //   this.events.push({
  //     title:this.title1,
  //     start:this.start1,
  //     end:this.end1,
      
  //     color:colors.red,
  //     draggable: true,
  //     resizable: {
  //       beforeStart: true,
  //       afterEnd: true
  //     }
  //   });
  //   console.log(this.events);
    
    
  //   this.refresh.next();
  }



  // addEvent(): void {
  //   this.events.push({
  //     title: 'New event',
  //     start:this.viewDate,
  //     end:endOfDay(new Date()),
      
  //     color: colors.red,
  //     draggable: true,
  //     resizable: {
  //       beforeStart: true,
  //       afterEnd: true
  //     }
  //   });
  //   console.log(this.events);
    
    
  //   this.refresh.next();
  // }

  deleteEvent(eventToDelete: CalendarEvent) {
    this.events = this.events.filter(event => event !== eventToDelete);
  }

  setView(view: CalendarView) {
    this.view = view;
  }

  closeOpenMonthViewDay() {
    this.activeDayIsOpen = false;
  }
 
}
