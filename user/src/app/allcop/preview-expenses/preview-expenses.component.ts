import { Component, OnInit } from '@angular/core';
import { HttpService } from '../../http.service';

import * as jsPDF from 'jspdf';
import html2canvas from 'html2canvas';
import { Router } from '@angular/router';

@Component({
  selector: 'app-preview-expenses',
  templateUrl: './preview-expenses.component.html',
  styleUrls: ['./preview-expenses.component.scss']
})
export class PreviewExpensesComponent implements OnInit {
  
  iddata: any[];
  expense: any;
  created: any;
  createdyear: any;
  createdmon: any;
  createdday: any;
  dueyear: any;
  duemon: any;
  dueay: any;
  email: any;
  title: any;
  city: any;
  address: any;
  itemname: any;
  itemcost: any;
  itemquan: any;
  price: any;
  subtotal: any;
  vatper: any;
  total: any;
  comments: any;
  paymentbank: any;
  constructor(private http:HttpService,private router:Router) { }

  ngOnInit() {
    this.getdata();
  }
 
  back(){
    this.router.navigate(['/list'])
  }
  getdata(){
    var id=localStorage.getItem("expdata")
     console.log("fscdx",id);
     let data={
       "id":id
     }
    this.http.gettitledata(data).subscribe(res=>{
      
      this.iddata=res
      this.expense=this.iddata[0].item
      // this.createdyear=this.iddata[0].model.year
      // this.createdmon=this.iddata[0].model.month
      // this.createdday=this.iddata[0].model.day
  
      this.dueyear=this.iddata[0].created.year
      this.duemon=this.iddata[0].created.month
      this.dueay=this.iddata[0].created.day
  
      this.title=this.iddata[0].title

      // this.email=this.iddata[0].email
      // this.city=this.iddata[0].city
      // this.address=this.iddata[0].address

      this.subtotal=this.iddata[0].subtotal
      this.vatper=this.iddata[0].vatper
      this.total=this.iddata[0].total
      this.comments=this.iddata[0].comments
      this.paymentbank=this.iddata[0].paymentbank
     
  
      console.log(this.expense);
      
    });
    
  }

  pdf() {
  var data = document.getElementById('pdff');
  html2canvas(data).then(canvas => {
    var imgWidth = 180; 
    var pageHeight = 180;  
    var imgHeight = canvas.height * imgWidth / canvas.width ;
    var heightLeft = imgHeight;
    const contentDataURL = canvas.toDataURL('image/png')
    let pdf = new jsPDF('p','mm','a4');
    var position = 0;
   
    pdf.addImage(contentDataURL, 'JPEG', 0, position, 203,287)
    pdf.save('UPS.pdf')
});
}
  

}
