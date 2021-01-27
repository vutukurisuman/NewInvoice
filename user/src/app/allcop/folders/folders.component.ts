import { Component, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { FormArray } from '@angular/forms';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { HttpService } from '../../http.service';

import { Router } from '@angular/router';

@Component({
  selector: 'app-folders',
  templateUrl: './folders.component.html',
  styleUrls: ['./folders.component.scss']
})
export class FoldersComponent implements OnInit {
  Form1: any;
  fb: any;
  arr1=[];
  folders:any[]=[];
  name;
  txt2;
  txt3;
  tmp:boolean=false;
  totalfolders;
  clients;
  // modalContent: TemplateRef<any>;
  @ViewChild('modalContent',{static:true}) modalContent: TemplateRef<any>;

  constructor(private modal:NgbModal,private ser:HttpService,private router:Router) { }

  ngOnInit() {
    this.getf();
    
  }

  addfun(){
    this.modal.open(this.modalContent, { size: 'sm' });
  }

  funname(z){
    
    // console.log(z)
    this.txt2=z;
    this.add();
  } 

  add(){
    
    var a;
    this.txt3=this.txt2
    this.arr1.push({name:this.txt3})
    
    for(var i=0;i<this.arr1.length;i++){
       a = this.arr1[i].name
      
    }
    var data = {
      "name" : a
    }
      this.ser.postfolders(data).subscribe(dt=>{
        console.log("res",dt)
      
      })
    
      this.getf()
    
    }

  getf(){
    this.ser.getfolders().subscribe((res)=>{
      console.log("responce folders",res)
      this.totalfolders=res;
      
    })
  }
  fun1(x,i){
    
    
   console.log(x)
   localStorage.setItem('name',x.name)
   this.router.navigate(['/allcop/folderdata'])
   
   
    }

  invoices(){
    
    this.router.navigate(['/allcop/invoicefolder'])
  }
  expenses(){
    this.router.navigate(['/allcop/expensefolder'])
  }  
  vendors(){
    this.router.navigate(['/allcop/venfolder'])
  }  
  
  


 


  
  // getfolders(){
    
  //    this.folders.push(this.arr1.length)

  //    console.log(this.arr1.length) 
    
  // }
  
  }
