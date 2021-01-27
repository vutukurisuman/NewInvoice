import { Component, OnInit, ViewChild, TemplateRef } from '@angular/core';
import { ViewEncapsulation } from '@angular/core';
import { HttpService } from '../../http.service';

import { FormControl, FormBuilder, ControlContainer } from '@angular/forms';
import { ModalDismissReasons, NgbModalOptions, NgbModalRef, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Route } from '@angular/compiler/src/core';
import { Router } from '@angular/router';
import { PdfsComponent} from '../pdfs/pdfs.component'
declare var $:any;
import Swal from 'sweetalert2';
import { getLocaleDateFormat } from '@angular/common';
@Component({
  selector: 'app-tables',
  templateUrl: './tables.component.html',
  styleUrls: ['./tables.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class TablesComponent implements OnInit {
  table1: boolean;
  table2: boolean;
  alldata:any[];
  profileForm: any;
  isChecked: any;
  selectForm: any;
  invs: any;
  archivedata:Array<any>=[];
  arr: Array<any>=[];
  foldernames: any;
  @ViewChild('modalContent',{static:true}) modalContent: TemplateRef<any>;
  folname: any;
  pdfsdata: any;
  items: any;
  subtot: any;
  vatper: any;
  total: any;
  title: any;
  phonenumber: any;
  email: any;
  address: any;
  city: any;
  tax: any;
  invoice: any;
  itemquan: any;
  itemname: any;
  year: any;
  month: any;
  date: any;
  username: any;

  constructor(private http:HttpService,private formBuilder:FormBuilder,private modalService : NgbModal,private router:Router) { 
    $('.tabs a').on('click', function(){
      $('.tabs ul li a .active').removeClass('active');
      $(this).addClass('active');
    });
  }

  ngOnInit() {
    this.table1 = true;
    this.getactive();
    this.profileForm = this.formBuilder.group({
      itemname: new FormControl(),    
    });
    this.selectForm = this.formBuilder.group({
      payment: new FormControl(),    
    });
     this.getarchive();
  }

  activefun(){
    this.table1 = true;
    this.table2 = false;
  }

   archived(){
    this.table1 = false;
    this.table2 = true;
   

  }

  quotform(){
    this.router.navigate(['/newinvoice'])
  }

getactive(){
  this.username= JSON.parse(localStorage.getItem("mail"));

    var status="Active"
   let data={
     "active":status,
     "operator":this.username.email
            }
 this.http.getactiveuserinvoice(data).subscribe(res=>{
  console.log("rejjjjs",res);
      //  function removeDuplicates() { 
        // Declare a new array 
        let newArray = [];          
        // Declare an empty object 
        let uniqueObject = {};          
        // Loop for the array elements 
        for (let i in res) { 
            // Extract the title 
            const objTitle = res[i]['invoice'];  
            // Use the title as the index 
            uniqueObject[objTitle] = res[i]; 
        }          
        // Loop to push unique object into array 
        for (let i in uniqueObject) { 
            newArray.push(uniqueObject[i]); 
        }          
        // Display the unique objects 
        console.log("gggggggggg",newArray); 
        for(var j=0;j<newArray.length;j++){
          var status=newArray[j].status
        console.log("ssssxa",status);
       
          this.alldata=newArray
     
        
        }
 });
}


getarchive(){
  this.username= JSON.parse(localStorage.getItem("mail"));

  var status="Archived"
 let data={
   "archived":status,
   "operator":this.username.email
          }
 console.log("@@@@@@@@@@@@",data);
 
 this.http.getarchiveuserinvoice(data).subscribe(res=>{
  console.log("rejjjjs",res);
      //  function removeDuplicates() { 
        // Declare a new array 
        let newArrays = [];          
        // Declare an empty object 
        let uniqueObject = {};          
        // Loop for the array elements 
        for (let i in res) { 
            // Extract the title 
            const objTitle = res[i]['invoice'];  
            // Use the title as the index 
            uniqueObject[objTitle] = res[i]; 
        }          
        // Loop to push unique object into array 
        for (let i in uniqueObject) { 
            newArrays.push(uniqueObject[i]); 
        }          
        // Display the unique objects 
        console.log("gggggggggg",newArrays); 
        for(var j=0;j<newArrays.length;j++){
          var status=newArrays[j].status
        console.log("ssssxa",status);
       
          this.archivedata.push(newArrays[j])
          console.log("!!!!!!!~~~~~~~~~~~~~~~~~",this.archivedata);
          
     
        
        }
 });
}
pdfdata(event){
  var tr = $(event.currentTarget).closest('tr')
  this.invs = tr.find(".case").text(); 
  let data={
    "invoice":this.invs
  }
  console.log("!!!!!!!!!!!!!@@@@@@@@@@pdf data fn",data);
  
  this.http.getiddata(data).subscribe(res=>{
    console.log("res",res);
    this.pdfsdata=res
    this.items=res.length
    for (var i = 0; i < this.pdfsdata.length; i++) {        
      this.pdfsdata[i]['sequencyId'] = i;
      this.subtot=this.pdfsdata[i].subtotal
      this.invoice=this.pdfsdata[i].invoice
      this.vatper=this.pdfsdata[i].vatper
      this.total=this.pdfsdata[i].total
      this.title=this.pdfsdata[i].title
      this.email=this.pdfsdata[i].email
      this.phonenumber=this.pdfsdata[i].phonenumber
      this.address=this.pdfsdata[i].address
      this.city=this.pdfsdata[i].city
      this.address=this.pdfsdata[i].address
      this.tax=this.pdfsdata[i].tax
      this.itemquan=this.pdfsdata[i].itemquan
      this.itemname=this.pdfsdata[i].itemname
      this.year=this.pdfsdata[i].model.year
      this.month=this.pdfsdata[i].model.month
      this.date=this.pdfsdata[i].model.day




  }
  })
}

 
onchange(event){
  var option=event.target.value; 
  var tr = $(event.currentTarget).closest('tr')
        var inv = tr.find(".case").text(); 
        console.log("hgjk",inv);
        let data={
          "option":option,
          "invnum":inv
        }
        this.http.postoption(data).subscribe(res=>{
          console.log("res",res);
        });
}

var1;
changed = (event) => {    
  if(event.target.checked){
        var tr = $(event.currentTarget).closest('tr')
        this.invs = tr.find(".case").text(); 
        this.var1=this.invs     
         let data={
           "invnum":this.invs,
          
         }
      this.arr.push(data)

         console.log("idssss",this.arr);
         
             this.http.checkeddata(data).subscribe(res=>{
               console.log("res",res);
             });
        
  }
  else{
    var tr = $(event.currentTarget).closest('tr')
    this.invs = "undefined"; 
     let data={
       "invnum":this.invs
     }
    console.log("fhghj",this.invs);
    this.http.checkeddata(data).subscribe(res=>{
      console.log("res",res);
    });
  }
  }



  toarchive(){
      //  var id =this.invs;
      //  let data={
      //   "id":id
      // }
      console.log("id",this.arr);
      for (var i = 0; i < this.arr.length; i++) {
        var data2={
         "ids": this.arr[i]
        }
        console.log("data",this.arr[i]);
      this.http.archive(data2).subscribe(res=>{
        console.log("resssssss",res);
        this.ngOnInit();
      });
    }
      Swal.fire({
        text: 'Archived Successfully',
        icon: 'success',
        confirmButtonText: 'OK',
      });
      this.ngOnInit();
  }
  


view(event){
    var tr = $(event.currentTarget).closest('tr')
      var dfg = tr.find(".case").text(); 
       localStorage.setItem("invid",dfg)
       console.log(dfg);
       
       this.router.navigate(['/pdfs']);
      //  this.pdfref.getdata();
}


  newinvoices(){
    this.router.navigate(['/newinvoice']);
  }

 modalReference: NgbModalRef;       // modal popup refrence variable
 closeResult: string;         // modal pop up close string
 openLargeModalPopup(content) {
   this.modalReference = this.modalService.open(content, { size: 'lg' });
   this.modalReference.result.then((result: any) => {
     this.closeResult = `Closed with: ${result}`;
   }, (reason) => {
     this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
   });
 }
 openMediumModalPopup(content) {
   let ngbModalOptions: NgbModalOptions = {
     backdrop: 'static',
     keyboard: false,
   };
   this.modalReference = this.modalService.open(content, ngbModalOptions);
   this.modalReference.result.then((result: any) => {
     this.closeResult = `Closed with: ${result}`;
   }, (reason) => {
     this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
   });
 }
 private getDismissReason(reason: any): string {
   if (reason === ModalDismissReasons.ESC) {
     return 'by pressing ESC';
   }
   else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
     return 'by clicking on a backdrop';
   } else {
     return `with: ${reason}`;
   }
 }


 open(){

  this.http.getfolders().subscribe((f)=>{
    console.log(f)
    this.foldernames =f
  })
  this.modalService.open(this.modalContent, { size: 'sm' });
  
}

sendfolname(x){
  this.folname = x;
  console.log(this.folname);
  let data={
    "invnum":this.invs,
    "folder":this.folname
  }
this.arr.push(data)

  console.log("idss",this.arr);
  
      this.http.sendifoldername(data).subscribe(res=>{
      
        console.log("resss",res);
      });
      console.log("ngoninit calling")
      this.ngOnInit();
}
  



}
