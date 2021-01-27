import { Component, OnInit } from '@angular/core';
import { HttpService } from '../../http.service';

import { Router } from '@angular/router';

@Component({
  selector: 'app-purchasefolder',
  templateUrl: './purchasefolder.component.html',
  styleUrls: ['./purchasefolder.component.scss']
})
export class PurchasefolderComponent implements OnInit {

  clients: any;

  constructor(private http:HttpService,private router:Router) { }

  ngOnInit() {
    this.getfoldersdata();
  }

  getfoldersdata(){
    var foldername=localStorage.getItem("foldername");
    var foldertype=localStorage.getItem("type");
    let data={
      "foldername":foldername,
      "status":"Archived"
    }
  //   if(foldertype=="Quotation"){
  //   this.http.getalldata(data).subscribe((res)=>{
  //     this.clients=res
  //     for (var i = 0; i < this.clients.length; i++) {        
  //       this.clients[i]['sequencyId'] = i;
  //   }
  //     console.log("dataaaa",res)
  //  })
  // }
  //Purchase Order
  if(foldertype=="Purchase Order"){
    this.http.getpurchasedata(data).subscribe((res)=>{
      this.clients=res
      for (var i = 0; i < this.clients.length; i++) {        
        this.clients[i]['sequencyId'] = i;
    }
      console.log("dataaaa",res)
   })
  }
  //Delivery Challan
  // if(foldertype=="Delivery Challan"){
  //   this.http.getalldata(data).subscribe((res)=>{
  //     this.clients=res
  //     for (var i = 0; i < this.clients.length; i++) {        
  //       this.clients[i]['sequencyId'] = i;
  //   }
  //     console.log("dataaaa",res)
  //  })
  // }
  //Invoice
  // if(foldertype=="Invoice"){
  //   this.http.getalldata(data).subscribe((res)=>{
  //     this.clients=res
  //     for (var i = 0; i < this.clients.length; i++) {        
  //       this.clients[i]['sequencyId'] = i;
  //   }
  //     console.log("dataaaa",res)
  //  })
  // }

  }

  back(){
    this.router.navigate(['/clientfolder'])
  }
}
