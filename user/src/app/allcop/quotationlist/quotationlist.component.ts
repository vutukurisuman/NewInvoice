import { Component, OnInit } from '@angular/core';
import { HttpService } from '../../http.service';

import { FormBuilder, FormControl } from '@angular/forms';
import { Router } from '@angular/router';
import { NgbModal, ModalDismissReasons, NgbModalOptions, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
declare var $:any;
import * as jsPDF from 'jspdf';
import html2canvas from 'html2canvas';import Swal from 'sweetalert2';
;
@Component({
  selector: 'app-quotationlist',
  templateUrl: './quotationlist.component.html',
  styleUrls: ['./quotationlist.component.scss']
})
export class QuotationlistComponent implements OnInit {
  expdata: any;
  tabledatanotfound: string;
  tabledata: boolean;
  profileForm: any;
  selectForm: any;
  table1: boolean;
  table2: boolean;
  invs: any;
  var1: any;
  arr: Array<any>=[];
  archiveddata: any;
  length: any;
  applist: Array<any>=[];
  purlist: any;
  notgen: boolean;
  gen: boolean;
  applistpurch: any;
  arraypurnumber: Array<any>=[];
  testpurclist: Array<any>=[];
  finalorder: any[];
  pdfsdata: any;
  items: any;
  subtot: any;
  vatper: any;
  total: any;
  title: any;
  email: any;
  phonenumber: any;
  address: any;
  city: any;
  invoice: any;
  username: any;


  constructor(private http:HttpService,private formBuilder:FormBuilder,private router:Router,private modalService: NgbModal,) {
    $('.tabs a').on('click', function(){
      $('.tabs ul li a .active').removeClass('active');
      $(this).addClass('active');
    });
   }
  
  ngOnInit() {
    this.table1 = true;
  
    this.profileForm = this.formBuilder.group({
       
    });
    this.selectForm = this.formBuilder.group({
      payment: new FormControl(),    
    });
   this.getactive()
   this.getarchiveddata()
   this.approved()
  }

  activefun(){
    this.table1 = true;
    this.table2 = false;
  }

   archived(){
    this.table1 = false;
    this.table2 = true;
    
  }

  getactive(){
    this.username= JSON.parse(localStorage.getItem("mail"));

    var status="Active"
   let data={
     "active":status,
     "operator":this.username.email
            }
   this.http.getactiveuserquotation(data).subscribe(res=>{
    // console.log("rejjjjs",res);
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
          // console.log("ssssxa",status);
         
            this.expdata=newArray
            this.expdata[j]['sequencyId'] = j;
          
          }
          
         
         
        }, error => {
          this.tabledata = true;
          console.log("error ", error.error.status)
          if (error.error.status == "false") {
            this.tabledatanotfound = "No Data Found";
            this.tabledata = true;
          }
          
   });
  }


  quotform(){
    this.router.navigate(['/allcop/quotation'])
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
          this.http.postquotoption(data).subscribe(res=>{
            // console.log("res",res);
          });
  }

  changed(event){    
    if(event.target.checked){
          var tr = $(event.currentTarget).closest('tr')
          this.invs = tr.find(".case").text(); 
          this.var1=this.invs     
           let data={
             "invnum":this.invs,
            
           }
        this.arr.push(data)
  
           console.log("idssss",this.arr);
    }
    else{
      var tr = $(event.currentTarget).closest('tr')
      this.invs = "undefined"; 
       let data={
         "invnum":this.invs
       }
       this.arr.push(data)
       console.log("idsssrfs",this.arr);
    }
    }


    toarchive(){
      console.log("idsssrfs",this.arr);
      for(var i=0; i<this.arr.length;i++){
      
           let data={
            "invnum":this.arr[i]
           }
          //  console.log("ecfsdc",data);
           
               this.http.quotchecked(data).subscribe(res=>{
                 console.log("res",res);
                 Swal.fire({
                  icon:'success',
                
                 text:"data archived successfully",
                 confirmButtonText: 'OK'
                 });
               });
             
              }
              
    }

    getarchiveddata(){
      this.username= JSON.parse(localStorage.getItem("mail"));

    var status="Archived"
   let data={
     "archived":status,
     "operator":this.username.email
            }
      this.http.getarchiveuserquotation(data).subscribe(res=>{
        this.length=res.length
        this.archiveddata=res

        for (var i = 0; i < this.archiveddata.length; i++) {        
          this.archiveddata[i]['sequencyId'] = i;
      }
        // console.log("res",res);
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
        // console.log("ssssxa",status);
       
          this.archiveddata=newArray
     
        
        }
      });
    }




    genpurchase(event){
      var tr = $(event.currentTarget).closest('tr')
          this.invs = tr.find(".case").text(); 
        // console.log("res",   this.invs );
        localStorage.setItem("quotnum",this.invs)
        this.router.navigate(['/allcop/delivery-challan'])

    }
    tracker(event){
      var tr = $(event.currentTarget).closest('tr')
          this.invs = tr.find(".case").text(); 
        // console.log("res",   this.invs );
        // localStorage.setItem("quotnum",this.invs)
        // this.router.navigate(['/purchaseorder'])

    }

    approved(){
      let data={
        "payment":"Approved"
      }

      this.http.approvedquot(data).subscribe(res=>{
        // console.log("res",res);
     this.applist=res
    
      
         for(var i=0;i<this.applist.length;i++){
          var approveddata=this.applist[i].invoice
         let data={
           "appid":approveddata
         }
         
         
         this.http.apppurchaseorders(data).subscribe(res1=>{
          this.purlist=res1
          console.log("jhbjhb",this.purlist);
          this.testpurclist.push(res1)
          console.log("!!!!!!!!!!!!!!!@@@@@@@@@@@",this.testpurclist);

            
          //  this.arraypurnumber.push(this.purlist)
          for(var j=0;j<this.purlist.length;j++){
            this.applistpurch=this.purlist[j].invoice
            
            this.arraypurnumber.push(this.applistpurch)
            this.testpurclist.push(this.purlist[j])
            console.log("testing purchlist",this.testpurclist);
            
          }

        });

      }
      // console.log("haiii",this.testpurclist);
      this.finalorder=this.testpurclist
      console.log("final",this.finalorder);
      
     
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
    pdfdata(event){
      var tr = $(event.currentTarget).closest('tr')
      this.invs = tr.find(".case").text(); 
      let data={
        "invnm":this.invs
      }
      this.http.pdfdata(data).subscribe(res=>{
        console.log("res",res);
        this.pdfsdata=res
        this.items=res.length
        for (var i = 0; i < this.pdfsdata.length; i++) {        
          this.pdfsdata[i]['sequencyId'] = i;
          this.subtot=this.pdfsdata[i].subtotal
          this.vatper=this.pdfsdata[i].vatper
          this.total=this.pdfsdata[i].total
          this.title=this.pdfsdata[i].title
          this.email=this.pdfsdata[i].email
          this.phonenumber=this.pdfsdata[i].phonenumber
          this.address=this.pdfsdata[i].address
          this.city=this.pdfsdata[i].city
          this.address=this.pdfsdata[i].address
          this.invoice=this.pdfsdata[i].invoice



      }
      })
    }

      //////////////////////////////////////////
  //        Modal Pop up code here
  //////////////////////////////////////////

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
  // console.log(this.startdate)
  this.modalReference = this.modalService.open(content, ngbModalOptions);
  this.modalReference.result.then((result: any) => {
    this.closeResult = `Closed with: ${result}`;
    console.log(result)
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























}
