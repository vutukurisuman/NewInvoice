import { Component, OnInit } from '@angular/core';
import { HttpService } from '../../http.service';

import { Router } from '@angular/router';
@Component({
  selector: 'app-vendors',
  templateUrl: './vendors.component.html',
  styleUrls: ['./vendors.component.scss']
})
export class VendorsComponent implements OnInit {

  expdata: any;
  tabledatanotfound: string;
  tabledata: boolean;

  constructor(private http:HttpService,private router:Router) { }

  ngOnInit() {
    this.allclients()

  }

allclients(){
  this.http.getvendor().subscribe((res)=>{
    this.expdata=res;
    if (this.expdata.length < 1) {
      this.tabledatanotfound = "No Data Found";
      this.tabledata = true;
    }
   for (var i = 0; i < this.expdata.length; i++) {        
      this.expdata[i]['sequencyId'] = i;
  } 
    console.log("nnnnn", this.expdata);
  }, error => {
    this.tabledata = true;
    console.log("error ", error.error.status)
    if (error.error.status == "false") {
      this.tabledatanotfound = "No Data Found";
      this.tabledata = true;
    }
 })
}


clientform(){
  this.router.navigate(['/vendorregform'])
}

}

