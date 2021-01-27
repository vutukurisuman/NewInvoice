import { Component, OnInit, ViewChild } from '@angular/core';
import { NgbTypeahead } from '@ng-bootstrap/ng-bootstrap';
import { Subject } from 'rxjs/Subject';
import { Observable } from 'rxjs/observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/debounceTime';
import 'rxjs/add/operator/distinctUntilChanged';
import 'rxjs/add/operator/merge';
import 'rxjs/add/operator/filter';
import { HttpService } from '../../http.service';

import Swal from 'sweetalert2';
import { Router } from '@angular/router';


@Component({
  selector: 'app-vendorform',
  templateUrl: './vendorform.component.html',
  styleUrls: ['./vendorform.component.scss']
})
export class VendorformComponent implements OnInit {

  currentRate: any;
  public typeaheadBasicModel: any;
  public typeaheadFocusModel: any;

  constructor(private http:HttpService,private router:Router) { }


  ngOnInit() {
    
  }
  ServiceData={ 
    clientname:"",
    email:"",
    gst:"",
    phonenumber:"",
    address:"",
    state:"",
    country:"",
    city:"",
    postcode:"",
    attnto:""
    }

    clear(ServiceData){
      ServiceData.clientname=""
      ServiceData.email="",
      ServiceData.gst="",
      ServiceData.phonenumber="",
      ServiceData.address="",
      ServiceData.state="",
      ServiceData.country="",
      ServiceData.city="",
      ServiceData.postcode="",
      ServiceData.attnto=""
    }
  adddata(ServiceData){
    var data= ServiceData
    this.http.createvendor(data).subscribe(res=>{
      console.log("res",res);
    
  });
  Swal.fire({
    icon:'success',
   title: this.ServiceData.clientname,
   text:"data saved successfully",
   confirmButtonText: 'OK'
   });
 
}

clientform(){
  this.router.navigate(['/vendors'])
}


}