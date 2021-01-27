import { Component, OnInit } from '@angular/core';
import { HttpService } from '../../http.service';

import { Router } from '@angular/router';
import { PdfsComponent } from '../pdfs/pdfs.component';


@Component({
  selector: 'app-folderdata',
  templateUrl: './folderdata.component.html',
  styleUrls: ['./folderdata.component.scss']
})
export class FolderdataComponent implements OnInit {
  name;
  invoicedata;
  id;
  expencedata;

  constructor(private ser:HttpService,private router:Router,) { 
    this.name=localStorage.getItem('name')
    console.log("getitem",this.name)
    
    let data = {
      folder :this.name
    }
    this.ser.postfnamei(data).subscribe((res)=>{
      console.log("postfname res",res)
      this.invoicedata=res;
    })
    this.ser.postfnameexp(data).subscribe((res)=>{
      console.log("postfname exp responce",res)
      this.expencedata=res
    })

  }

  ngOnInit() {
   
  }

  fun(id){
    localStorage.setItem('id1',id)
    this.router.navigate(['foldertopdf']);  
  }

  funexp(title){
   localStorage.setItem('expdata',title);
   this.router.navigate(['preview/expenses'])
  }
}
