import { Component, OnInit } from '@angular/core';
import { HttpService } from '../../http.service';

import * as jsPDF from 'jspdf';
import html2canvas from 'html2canvas';
import { KeyObject } from 'crypto';
@Component({
  selector: 'app-pdfs',
  templateUrl: './pdfs.component.html',
  styleUrls: ['./pdfs.component.scss']
})
export class PdfsComponent implements OnInit {
  iddata: any[];
  invoice: any;
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
  
   
  constructor(private http:HttpService) {
   
   
    
 
    
   }

  ngOnInit() {
    
    this.getdata();
    
    
  }

  getdatatopdf(){
    
      var id=localStorage.getItem("id1")
       console.log("id in folder",id);
       let data={
         "id":id
       }
      this.http.getdatatopdf(data).subscribe(res=>{
        console.log("getdatatopdf responce",res)
        this.iddata=res
        this.invoice=this.iddata[0].invoice
        this.title = this.iddata[0].title
        this.createdyear=this.iddata[0].model.year
        this.createdmon=this.iddata[0].model.month
        this.createdday=this.iddata[0].model.day
    
        this.dueyear=this.iddata[0].model1.year
        this.duemon=this.iddata[0].model1.month
        this.dueay=this.iddata[0].model1.day
    
        this.title=this.iddata[0].title
        this.email=this.iddata[0].email
        this.city=this.iddata[0].city
        this.address=this.iddata[0].address
        this.subtotal=this.iddata[0].subtotal
        this.vatper=this.iddata[0].vatper
        this.total=this.iddata[0].total
        this.comments=this.iddata[0].comments
        this.paymentbank=this.iddata[0].paymentbank
       
        // localStorage.removeItem('id1')
        console.log(this.invoice);
        
        
      });
      
    
    
  }

   getdata(){
  var id=localStorage.getItem("invid")
   console.log("fscdx",id);
   let data={
     "invoice":id
   }
  this.http.getiddata(data).subscribe(res=>{
    console.log("getdata function responce",res)
    this.iddata=res
    this.invoice=this.iddata[0].invoice
    this.createdyear=this.iddata[0].model.year
    this.createdmon=this.iddata[0].model.month
    this.createdday=this.iddata[0].model.day

    this.dueyear=this.iddata[0].model1.year
    this.duemon=this.iddata[0].model1.month
    this.dueay=this.iddata[0].model1.day

    this.title=this.iddata[0].title
    this.email=this.iddata[0].email
    this.city=this.iddata[0].city
    this.address=this.iddata[0].address
    this.subtotal=this.iddata[0].subtotal
    this.vatper=this.iddata[0].vatper
    this.total=this.iddata[0].total
    this.comments=this.iddata[0].comments
    this.paymentbank=this.iddata[0].paymentbank
    
    this.itemname = this.iddata[0].itemname;
    this.itemcost = this.iddata[0].itemcost;
    console.log("yyj",this.itemname,this.itemcost)

    // console.log("jhghh",this.invoice);
    
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
