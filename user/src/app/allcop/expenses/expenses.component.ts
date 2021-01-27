import { Component, OnInit } from '@angular/core';
import {NgbCalendar, NgbDateStruct} from '@ng-bootstrap/ng-bootstrap';

import { FormBuilder, FormControl, FormGroup, FormArray } from '@angular/forms';
import { HttpService } from '../../http.service';

import Swal from 'sweetalert2';


@Component({
  selector: 'app-expenses',
  templateUrl: './expenses.component.html',
  styleUrls: ['./expenses.component.scss']
})
export class ExpensesComponent implements OnInit {
  created: NgbDateStruct;
  products = [
    {
      itemname:'',
      itemcost:'',
      itemquan:'',
      price:'',
    }]

    ServiceData={ 
      title:"" ,
      category:"",
      created:"",
      vat:"21",
      comments:"",
      paymentbank:""
    }
  profileForm: any;
  
  constructor(private calendar: NgbCalendar,public formBuilder: FormBuilder,private http:HttpService) { }

  ngOnInit() {
    this.profileForm = this.formBuilder.group({
      subtotal: new FormControl(),    
      vatper:new FormControl(),
      total:new FormControl(),
      products : this.formBuilder.array
      ([

      ])
    });
    this.loadProducts()
  }
  loadProducts() {
    const control = <FormArray>this.profileForm.get('products');
    for (const product of this.products) {
      const grp = this.formBuilder.group({   
        itemname: [product.itemname],
        itemcost: [product.itemcost],
        itemquan: [product.itemquan],
        price: [product.price],
      });
      control.push(grp);
    }
  }

  initiatProduct(): FormGroup {
    return this.formBuilder.group({
      itemname: [''],
      itemcost: [''],
      itemquan: [''],
      price: ['']
    });
  }
  
  get getFormData(): FormArray {
    return <FormArray>this.profileForm.get('products');
  }
  
  addProduct() {
    const control = <FormArray>this.profileForm.get('products');
      control.push(this.initiatProduct());
  }
  
  remove(i)  {
    const control = <FormArray>this.profileForm.get('products');
      control.removeAt(i+0);
    }


    funprint(){
      console.log(this.profileForm.value)
    }
    getName(i) {
      var arrayControl = this.profileForm.get('products') as FormArray;
      var item = arrayControl.value;
 
    const controlArray = <FormArray> this.profileForm.get('products');
    var itemcosts =  this.getControls()[i].value.itemcost;
    console.log("cost",itemcosts); 
    var itemquan = this.getControls()[i].value.itemquan;
    var prices=Math.round( (itemcosts * itemquan));
    controlArray.controls[i].get('price').setValue(prices);
  //
    var grand =  this.getControls()[i].value.price;
    //adding all total amount for grand total
    this.profileForm.get('products').valueChanges
    .subscribe((newVal) => {
      // newVal contains the whole array
    
      // We're patching the value of total control
      this.profileForm.controls['subtotal'].patchValue(
        // Use the newVal array to calculate the sum using reduce
        newVal.reduce((acc, curr) => {
          // interpret curr.value as a number using (+x) operator
          return acc + (+curr.price);
        }, 0)
      )
    });

   var subtot=this.profileForm.controls['subtotal'].value
   
   var vats=this.ServiceData.vat
   var vattot=Math.round( (+vats/100) * (subtot));
   var subtots=this.profileForm.controls['vatper'].setValue(vattot)
    var finaltotal=subtot+vattot
    // console.log("gfhjk",finaltotal);
    
   var tot=this.profileForm.controls['total'].setValue(finaltotal)

    }
    getControls() {
      return (<FormArray>this.profileForm.get('products')).controls;
    }

    public asset: any = () => {
      let data = this.profileForm.value
      
      var arrayControl = this.profileForm.get('products') as FormArray;
      var item = arrayControl.value;
      var dict = [];
      for(var i = 0; i < item.length; i++) 
      { 
        dict.push({
        
        title:this.ServiceData.title,
        category:this.ServiceData.category,
        created:this.ServiceData.created, 
        vat:this.ServiceData.vat, 
        comments:this.ServiceData.comments,
        paymentbank:this.ServiceData.paymentbank,
        itemquan: item[i].itemquan,
        itemname: item[i].itemname,
        itemcost: item[i].itemcost,
        price: item[i].price,
        subtotal:this.profileForm.controls['subtotal'].value,
        vatper:this.profileForm.controls['vatper'].value,
        total:this.profileForm.controls['total'].value,
        
           
    
      })
    }
      console.log(dict);
      for(var j = 0; j < dict.length; j++) 
      { 
        var datain=dict[j]
        console.log(dict[j]);
        this.http.expense(datain).subscribe(res=>{
          console.log("res",res);
        })
      }
      Swal.fire({
        icon:'success',
       title: this.ServiceData.title,
       text:"data saved successfully",
       confirmButtonText: 'OK'
       });
     
      
    
    }
    
    
     

}
