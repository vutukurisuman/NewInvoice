import { Component, OnInit } from '@angular/core';
import { HttpService } from '../../http.service';

import { FormBuilder, FormControl } from '@angular/forms';
import { Router } from '@angular/router';
import { NgbModal, ModalDismissReasons, NgbModalOptions, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';

declare var $:any;

@Component({
  selector: 'app-purchaseorderlist',
  templateUrl: './purchaseorderlist.component.html',
  styleUrls: ['./purchaseorderlist.component.scss']
})
export class PurchaseorderlistComponent implements OnInit {
 
  table1: boolean;
  table2: boolean;
  expdata: any[];
  tabledata: boolean;
  tabledatanotfound: string;
  selectForm: any;
  invs: any;
  var1: any;
  arr: Array<any>=[];
  archiveddata: any[];
  length: any;
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

  constructor(private http:HttpService,private formBuilder:FormBuilder,private router:Router,private modalService: NgbModal,) { 
    $('.tabs a').on('click', function(){
      $('.tabs ul li a .active').removeClass('active');
      $(this).addClass('active');
    });
  }

  ngOnInit() {
    this.table1 = true;
    this.getactive();
    this.getarchiveddata()
    this.selectForm = this.formBuilder.group({
      payment: new FormControl(),    
    });
  }
  activefun(){
    this.table1 = true;
    this.table2 = false;
  }

   archived(){
    this.table1 = false;
    this.table2 = true;
  }
  purchaseform(){
    localStorage.clear()
    this.router.navigate(['/purchaseorder'])
  }


  getactive(){
  
   this.http.purchaseactive().subscribe(res=>{
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
          this.http.postpurchaseoption(data).subscribe(res=>{
            console.log("res",res);
            this.ngOnInit()
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
      //  console.log("idsssrfs",this.arr);
    }
    }


    toarchive(){
      console.log("idsssrfs",this.arr);
      for(var i=0; i<this.arr.length;i++){
      
           let data={
            "purchnum":this.arr[i]
           }
           console.log("ecfsdc",data);
           
               this.http.purchasechecked(data).subscribe(res=>{
                 console.log("res",res);
                 this.ngOnInit()
               });
               
              }
    }




    getarchiveddata(){
      this.http.purchasearchive().subscribe(res=>{
        this.length=res.length
        this.archiveddata=res

        for (var i = 0; i < this.archiveddata.length; i++) {        
          this.archiveddata[i]['sequencyId'] = i;
      }
        console.log("res",res);
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
       
          this.archiveddata=newArray
     
        
        }
      });
    }


    genpurchase(event){
      var tr = $(event.currentTarget).closest('tr')
          this.invs = tr.find(".case").text(); 
        // console.log("res",   this.invs );
        localStorage.setItem("quotnum",this.invs)
        this.router.navigate(['/delivery-challan'])

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
