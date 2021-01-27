import { Component, OnInit } from '@angular/core';
import { HttpService } from '../../http.service';

import { FormBuilder, FormControl } from '@angular/forms';
import { Router } from '@angular/router';
import { NgbModal, ModalDismissReasons, NgbModalOptions, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';

declare var $:any;

@Component({
  selector: 'app-delivery-challanlist',
  templateUrl: './delivery-challanlist.component.html',
  styleUrls: ['./delivery-challanlist.component.scss']
})
export class DeliveryChallanlistComponent implements OnInit {

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
  username: any;


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
    this.router.navigate(['/delivery-challan'])
  }


  getactive(){
    this.username= JSON.parse(localStorage.getItem("mail"));

    var status="Active"
   let data={
     "active":status,
     "operator":this.username.email
            }
   this.http.getactiveuserdelivery(data).subscribe(res=>{
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

  onchange(event){
    var option=event.target.value; 
    var tr = $(event.currentTarget).closest('tr')
          var inv = tr.find(".case").text(); 
          console.log("hgjk",inv);
          let data={
            "option":option,
            "invnum":inv
          }
          this.http.updatedeliverychaoption(data).subscribe(res=>{
            console.log("res",res);
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
           
               this.http.deliverychachecked(data).subscribe(res=>{
                 console.log("res",res);
                 this.ngOnInit()
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
      this.http.getarchiveuserdelivery(data).subscribe(res=>{
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
        this.router.navigate(['/allcop/newinvoice'])

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

