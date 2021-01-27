import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { HttpService } from '../../http.service';
@Component({
  selector: 'app-vendorsfolder',
  templateUrl: './vendorsfolder.component.html',
  styleUrls: ['./vendorsfolder.component.scss']
})
export class VendorsfolderComponent implements OnInit {
  clients:any;
  constructor(private ser:HttpService,private router:Router) { }

  ngOnInit() {
    this.ser.getvendor().subscribe((res)=>{
      this.clients=res
      console.log("clientnames from this.folders.ts",this.clients)
   })
  }

  client(c1,i){
    console.log("fgfg",c1.clientname);
    localStorage.setItem("foldername",c1.clientname);
    this.router.navigate(['/allcop/vdetailsfolder'])

  }

}
