import { Component, OnInit } from '@angular/core';
import { HttpService } from '../../http.service';

import { Router } from '@angular/router';

@Component({
  selector: 'app-invoicefolder',
  templateUrl: './invoicefolder.component.html',
  styleUrls: ['./invoicefolder.component.scss']
})
export class InvoicefolderComponent implements OnInit {
clients:any;
  constructor(private ser:HttpService,private router:Router) { }

  ngOnInit() {
    this.ser.getclient().subscribe((res)=>{
      this.clients=res
      console.log("clientnames from this.folders.ts",this.clients)
   })
  }

  client(c1,i){
    console.log("fgfg",c1.clientname);
    localStorage.setItem("foldername",c1.clientname);
    this.router.navigate(['/allcop/clientfolder'])

  }
  back(){
    this.router.navigate(['/allcop/folders'])

  }
}
