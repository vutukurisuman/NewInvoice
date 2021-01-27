import { Component, OnInit } from '@angular/core';
import { ViewEncapsulation } from '@angular/core';
import { HttpService } from '../../http.service';

import * as CanvasJS from '../../canvasjs.min';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class DashboardComponent implements OnInit {
totalinvoices;
invoices
totalexpenses;
totaltasks;
totalclients;
  archived: any;
  active: any;
  activeexp: any;
  archivedexpen: any;
  complttask: any;
  getnewtask: any;
  getfolders: any;
  constructor(private http:HttpService) { }

  ngOnInit() {
    this.http.getinvoice().subscribe((inv)=>{
      this.invoices=inv
      this.totalinvoices=inv.length
      
    })  
    this.http.getactiveexpenses().subscribe((exp)=>{
      this.totalexpenses=exp.length
    })  
    this.http.getalltasks().subscribe((task)=>{
      this.totaltasks=task.length
   
    })  
    this.http.getclient().subscribe((client)=>{
      this.totalclients=client.length
 
})

this.http.getarchiveonly().subscribe((archived)=>{
  this.archived=archived.length
  console.log("dghdv",this.archived);
  

this.http.getactiveonly().subscribe((active)=>{
  this.active=active.length

  this.http.getactivedata().subscribe((active)=>{
    this.activeexp=active.length

    this.http.getarchiveddata().subscribe((active)=>{
      this.archivedexpen=active.length

      this.http.complttask().subscribe((active)=>{
        this.complttask=active.length
        this.http.getnewtask().subscribe((active)=>{
          this.getnewtask=active.length
          this.http.getfolders().subscribe((active)=>{
            this.getfolders=active.length
  //chart
  let chart = new CanvasJS.Chart("chartContainer", {
    theme: "light2",
    animationEnabled: true,
    exportEnabled: true,
    title:{
      text: ""
    },
    data: [{
      type: "pie",
      showInLegend: true,
      toolTipContent: "<b>{name}</b>: {y}",
      indexLabel: "{name}  {y}",
      dataPoints: [
        { y:  this.getfolders, name: "Folders" },
        { y: this.complttask, name: "Completed Tasks" },
        { y: this.getnewtask, name: "Pending Tasks" },
        { y: this.archivedexpen, name: "Expenses Archived" },
        { y: this.activeexp, name: "Expenses Pending" },
        { y: this.active, name: "Invoice Archived"},
        { y: this.archived, name: "Invoice Pending"},

        
      ]
    }]
  });
    
  chart.render();
}) 
})
}) 
}) 
}) 
}) 
}) 





    }

  }


