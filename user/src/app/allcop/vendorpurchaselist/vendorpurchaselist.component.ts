import { Component, OnInit } from '@angular/core';
import { HttpService } from '../../http.service';

import { Router } from '@angular/router';


@Component({
  selector: 'app-vendorpurchaselist',
  templateUrl: './vendorpurchaselist.component.html',
  styleUrls: ['./vendorpurchaselist.component.scss']
})
export class VendorpurchaselistComponent implements OnInit {
  clients: any;

  constructor(private http:HttpService,private router:Router) { }

  ngOnInit() {
    this.getfoldersdata();
  }

  getfoldersdata(){
    var foldername=localStorage.getItem("foldername");
    var foldertype=localStorage.getItem("type");
    console.log(foldertype);
    
    let data={
      "folder":foldername,
      "status":"Archived"
    }
    if(foldertype=="Quotation"){
    console.log("quotation",foldername);

    this.http.getalldata(data).subscribe((res)=>{
      this.clients=res
      for (var i = 0; i < this.clients.length; i++) {        
        this.clients[i]['sequencyId'] = i;
    }
      console.log("dataaaa",res)
   })
  }
  //Purchase Order
  if(foldertype==="Purchase"){
    console.log("purchase",data);
    this.http.vendorpurchasedata(data).subscribe((res)=>{
      this.clients=res
      for (var i = 0; i < this.clients.length; i++) {        
        this.clients[i]['sequencyId'] = i;
    }
      console.log("dataaaa",res)
   })
  }
  //Delivery Challan
  if(foldertype==="Delivery Challan"){
    console.log(data);
    
    this.http.getdeliverydata(data).subscribe((res)=>{
      this.clients=res
      for (var i = 0; i < this.clients.length; i++) {        
        this.clients[i]['sequencyId'] = i;
    }
      console.log("dataaaa",res)
   })
  }
  //Invoice
  if(foldertype=="Invoice"){
    this.http.getalldata(data).subscribe((res)=>{
      this.clients=res
      for (var i = 0; i < this.clients.length; i++) {        
        this.clients[i]['sequencyId'] = i;
    }
      console.log("dataaaa",res)
   })
  }

  }

  back(){
    this.router.navigate(['/venfolder'])
  }
}
