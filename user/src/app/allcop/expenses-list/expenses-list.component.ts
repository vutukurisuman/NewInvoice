import { Component, OnInit, ViewChild, TemplateRef } from '@angular/core';
import { ViewEncapsulation } from '@angular/core';
import { HttpService } from '../../http.service';

import { FormControl, FormBuilder, ControlContainer } from '@angular/forms';
import { ModalDismissReasons, NgbModalOptions, NgbModalRef, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Route } from '@angular/compiler/src/core';
import { Router } from '@angular/router';
declare var $:any;
import Swal from 'sweetalert2';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
@Component({
  selector: 'app-expenses-list',
  templateUrl: './expenses-list.component.html',
  styleUrls: ['./expenses-list.component.scss']
})
export class ExpensesListComponent implements OnInit {
  table1: boolean;
  table2: boolean;
  alldata:any[];
  profileForm: any;
  isChecked: any;
  selectForm: any;
  invs: any;
  folname;
  archivedata: any[];
  arr: Array<any>=[];
  foldernames;
 
  @ViewChild('modalContent',{static:true}) modalContent: TemplateRef<any>;
  modal: any;

  constructor(private http:HttpService,private formBuilder:FormBuilder,private modalService : NgbModal,private router:Router) { }

  newexpenses(){
    this.router.navigate(['/allcop/expenses'])
  }

view(event){
    var tr = $(event.currentTarget).closest('tr')
      var dfg = tr.find(".case").text(); 
       localStorage.setItem("expdata",dfg)
       console.log("@test",dfg);
       
       this.router.navigate(['/preview/expenses']);
}

getactive(){
  
 this.http.getactivedata().subscribe(res=>{
  console.log("rejjjjs",res);
      // - function removeDuplicates() { 
        // -Declare a new array 
        let newArray = [];          
        //- Declare an empty object 
        let uniqueObject = {};          
        // -Loop for the array elements 
        for (let i in res) { 
            // --Extract the title 
            const objTitle = res[i]['title'];  
            //- Use the title as the index 
            uniqueObject[objTitle] = res[i]; 
        }          
        // -Loop to push unique object into array 
        for (let i in uniqueObject) { 
            newArray.push(uniqueObject[i]); 
        }          
        // -Display the unique objects 
        console.log("gggggggggg",newArray); 
        for(var j=0;j<newArray.length;j++){
          var status=newArray[j].status
        console.log("ssssxa",status);
       
          this.alldata=newArray;
          
     
        
        }
 });
}

getarchive(){
  var status="Archived"
 let data={
   "archive":status
 }
 
 this.http.getarchiveexpense(data).subscribe(res=>{
  console.log("rejjjjs",res);
      //  function removeDuplicates() { 
        // Declare a new array 
        let newArrays = [];          
        // Declare an empty object 
        let uniqueObject = {};          
        // Loop for the array elements 
        for (let i in res) { 
            // Extract the title 
            const objTitle = res[i]['title'];  
            // Use the title as the index 
            uniqueObject[objTitle] = res[i]; 
        }          
        // Loop to push unique object into array 
        for (let i in uniqueObject) { 
            newArrays.push(uniqueObject[i]); 
        }          
        // Display the unique objects 
        console.log("ggggg",newArrays); 
        for(var j=0;j<newArrays.length;j++){
          var status=newArrays[j].status
        console.log("ssssxa",status);
       
          this.archivedata=newArrays
     
        
        }
 });
 
}



  onchange(event){
    console.log(event.target.value)
    var option=event.target.value; 
    var tr = $(event.currentTarget).closest('tr')
          var inv = tr.find(".case").text(); 
          console.log("hgjk",inv);
          let data={
            "option":option,
            "invnum":inv
          }
          console.log("gfgfgg",data);
          
          this.http.postexpoption(data).subscribe(res=>{
            console.log("res",res);
          });
  }
var1;
  changed = (event) => {    
    if(event.target.checked){
          var tr = $(event.currentTarget).closest('tr')
          this.invs = tr.find(".case").text(); 
          this.var1=this.invs

           
    }
    else{
      var tr = $(event.currentTarget).closest('tr')
      this.invs = "undefined"; 
       let data={
         "invnum":this.invs
       }
      console.log("fhghj",this.invs);
      this.http.checkedexpdata(data).subscribe(res=>{
        console.log("res",res);
      });
    }
    }
    activefun(){
      this.table1 = true;
      this.table2 = false;
    }
  

  archived(){
    this.table1 = false;
    this.table2 = true;
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
    this.http.archiveexp(data2).subscribe(res=>{
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
/// popup
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
  
      this.http.sendfoldername(data).subscribe(res=>{
        console.log("resss",res);
      });
      this.ngOnInit();
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

  ngOnInit() {
this.table1=true;
  this.getactive();
  this.getarchive();
    
  }


  }
