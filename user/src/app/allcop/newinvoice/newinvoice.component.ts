import { Component, OnInit } from '@angular/core';
import {NgbCalendar, NgbDateStruct} from '@ng-bootstrap/ng-bootstrap';

import { FormBuilder, FormControl, FormGroup, FormArray } from '@angular/forms';
import { HttpService } from '../../http.service';

import Swal from 'sweetalert2';
import { Title } from '@angular/platform-browser';

@Component({
  selector: 'app-newinvoice',
  templateUrl: './newinvoice.component.html',
  styleUrls: ['./newinvoice.component.scss']
})
export class NewinvoiceComponent implements OnInit {
  universityname:any;
  currentDate = new Date();
  model: NgbDateStruct;
  model1: NgbDateStruct;
  today = this.calendar.getToday();
  vat:number;
  prices: number;
  percent:number;

  num1:number;
  num2:number;
  array:Array<any>=[];

  products = [
    {
      itemname:'',
      itemcost:'',
      itemquan:'',
      price:'',
      percentage:''
    }]
  profileForm: any;
  alldata: any[];
  selectedLevel: any;
  data: EventTarget;
  username: any;
  constructor(private calendar: NgbCalendar,public formBuilder: FormBuilder,private http:HttpService) { 
 
  }

  ngOnInit() {
    this.username= JSON.parse(localStorage.getItem("mail"));

    this.profileForm = this.formBuilder.group({
      subtotal: new FormControl(),    
      vatper:new FormControl(),
      total:new FormControl(),
      products : this.formBuilder.array
      ([

      ])
    });
    this.loadProducts(); 
    this.clients();
    this.bindingdata()
  }


  ServiceData={ 
    model1:"",
    model:"",
    invoice:"",
    phonenumber:"",
    email:"",
    tax:"",
    country:"",
    city:"",
    address:"",
    title:"" ,
    vat:"18",
    discount:"0",
    comments:"Pay in 30 Days",
    paymentbank:"Direct Transfer to ' THE BANK ',                             ISBIN-00998-8948-8487-8447-88,                    To-JOHN",
    operator:""
  }

  loadProducts() {
    const control = <FormArray>this.profileForm.get('products');
    for (const product of this.products) {
      const grp = this.formBuilder.group({   
        itemname: [product.itemname],
        itemcost: [product.itemcost],
        itemquan: [product.itemquan],
        price: [product.price],
        percentage: [product.percentage]
      });
      control.push(grp);
    }
  }

  initiatProduct(): FormGroup {
    return this.formBuilder.group({
      itemname: [''],
      itemcost: [''],
      itemquan: [''],
      price: [''],
      percentage:['']
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

 


  
    getName(i) {

      var arrayControl = this.profileForm.get('products') as FormArray;
      var item = arrayControl.value;
 
    const controlArray = <FormArray> this.profileForm.get('products');
    var itemcosts:number  =  this.getControls()[i].value.itemcost;
    
    
    this.percent =  this.getControls()[i].value.percentage;
    var percen =  this.getControls()[i].value.percentage;


    ///////////////////testing await///////////
    function sleep(ms) {
      return new Promise(resolve => setTimeout(resolve, ms));
    }
    var numm;
    async function delayedGreeting() {
      console.log("Hello");
      await sleep(2000);
      numm=percen
      // if(numm!=null){
      //   console.log("!!!!!!!!!!!!!!!!@@@@@@@@@@@@this nummmmmm",numm);
    
      //     var unitpruice:number =Math.round( (+numm/100) * (itemcosts))
        
      //     var totalunit =(+unitpruice)+(+itemcosts)
      //     console.log("cost",totalunit); 
      //     //if condition end
    
      //   controlArray.controls[i].get('itemcost').setValue(totalunit);
    
      //   var itemquan = this.getControls()[i].value.itemquan;
      //   var prices=Math.round( (totalunit * itemquan));
    
      //   controlArray.controls[i].get('price').setValue(prices);
       
      
      //   var grand =  this.getControls()[i].value.price;
      //   //adding all total amount for grand total
      //   this.profileForm.get('products').valueChanges
      //   .subscribe((newVal) => {
      //     // newVal contains the whole array
        
      //     // We're patching the value of total control
      //     this.profileForm.controls['subtotal'].patchValue(
      //       // Use the newVal array to calculate the sum using reduce
      //       newVal.reduce((acc, curr) => {
      //         // interpret curr.value as a number using (+x) operator
      //         return acc + (+curr.price);
      //       }, 0)
      //     )
      //   });
    
      //  var subtot=this.profileForm.controls['subtotal'].value
       
      //  var vats=this.ServiceData.vat
      //  var vattot=Math.round( (+vats/100) * (subtot));
      //  var subtots=this.profileForm.controls['vatper'].setValue(vattot)
      //   var finaltotal=subtot+vattot
      //   console.log("gfhjk",finaltotal);
        
      //  var tot=this.profileForm.controls['total'].setValue(finaltotal)
    
      //   }
      console.log("World!",numm);
    }

    
    delayedGreeting();
    console.log("Goodbye!");

    /////////////////end await///////////////

    console.log("!!!!!!!!!!!!!!!!@@@@@@@@@@@@this per",numm);
    
    var unitpruice:number =Math.round( (+percen/100) * (itemcosts))
    
    var totalunit =(+unitpruice)+(+itemcosts)
    console.log("cost",totalunit); 

    controlArray.controls[i].get('itemcost').setValue(totalunit);

    var itemquan = this.getControls()[i].value.itemquan;
    var prices=Math.round( (totalunit * itemquan));

    controlArray.controls[i].get('price').setValue(prices);
   
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
    console.log("gfhjk",finaltotal);
    
   var tot=this.profileForm.controls['total'].setValue(finaltotal)

    //if
    if(this.percent==null){
      console.log("this is from null");
      
      let d={
        "title":this.ServiceData.title
      }
      console.log("!!!!!!!!!!!!!!!!@@@@@@@@@@@@this id d",d);
      
      this.http.deliverybyname(d).subscribe(response =>{
  for (var i=0; i <response.length; i++) {
      const controlArrays = <FormArray> this.profileForm.get('products');
      controlArrays.controls[i].get('itemquan').setValue(response[i].itemquan);
      controlArrays.controls[i].get('itemname').setValue(response[i].itemname);
      controlArrays.controls[i].get('itemcost').setValue(response[i].itemcost);
      controlArrays.controls[i].get('price').setValue(response[i].price);
    }
    var subtot=this.profileForm.controls['subtotal'].value
   
    var vats=this.ServiceData.vat
    var vattot=Math.round( (+vats/100) * (subtot));
    var subtots=this.profileForm.controls['vatper'].setValue(vattot)
     var finaltotal=subtot+vattot
     console.log("gfhjk",finaltotal);
     
    var tot=this.profileForm.controls['total'].setValue(finaltotal)
      })
    
    }
    
    //if condition end

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
    vat:this.ServiceData.vat,
    title:this.ServiceData.title,
    address:this.ServiceData.address,
    city:this.ServiceData.city,
    country:this.ServiceData.country,
    tax:this.ServiceData.tax,
    email:this.ServiceData.email,
    phonenumber:this.ServiceData.phonenumber,
    invoice:this.ServiceData.invoice,
    model:this.ServiceData.model,
    model1:this.ServiceData.model1,
    comments:this.ServiceData.comments,
    paymentbank:this.ServiceData.paymentbank,
    itemquan: item[i].itemquan,
    itemname: item[i].itemname,
    itemcost: item[i].itemcost,
    price: item[i].price,
    subtotal:this.profileForm.controls['subtotal'].value,
    vatper:this.profileForm.controls['vatper'].value,
    total:this.profileForm.controls['total'].value,
    operator:this.username.email   
       

  })
}
  console.log(dict);
  for(var j = 0; j < dict.length; j++) 
  { 
    var datain=dict[j]
    console.log(dict[j]);
    this.http.invoice(datain).subscribe(res=>{
      console.log("res",res);
      let dataclient={
        "email":dict[0].email,
      }
      this.http.clientInvoice(dataclient).subscribe(res=>{
        console.log("res",res);
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
        var length=newArray.length

        let data={
          "length":length,
          "email":dict[0].email,
        }
        console.log("dataaaaaa",data);
        
        this.http.updateinvoicelength(data).subscribe(res=>{
          console.log("res",res);
        })
      })
    })
  }

  Swal.fire({
   icon:'success',
  title: this.ServiceData.invoice,
  text:"data saved successfully",
  confirmButtonText: 'OK'
  });

  

}



clients(){
  this.http.getvendor().subscribe(res=>{
    console.log("res",res);
    this.alldata=res
});
}

onchange(event){
  this.data=event.target.value; 
  console.log("jkl",this.data);
  var names={
   "name": this.data
  }
  this.http.getvendorbyname(names).subscribe(res=>{
    console.log("res",res);
    this.ServiceData.title=res[0].clientname
    this.ServiceData.tax=res[0].gst
    this.ServiceData.city=res[0].city
    this.ServiceData.email=res[0].email
    this.ServiceData.phonenumber=res[0].phonenumber
    this.ServiceData.address=res[0].address
    this.ServiceData.country=res[0].country

    let d={
      "title":res[0].clientname
    }
    this.http.deliverybyname(d).subscribe(response =>{
for (var i=0; i <response.length; i++) {
    // const control = <FormArray>this.profileForm.controls['products'];
    // control.push(this.initiatProduct());
    const controlArrays = <FormArray> this.profileForm.get('products');
    controlArrays.controls[i].get('itemquan').setValue(response[i].itemquan);
    controlArrays.controls[i].get('itemname').setValue(response[i].itemname);
    controlArrays.controls[i].get('itemcost').setValue(response[i].itemcost);
    controlArrays.controls[i].get('price').setValue(response[i].price);
  }

    })
  });
}

bindingdata(){
  var qoutnum=localStorage.getItem("quotnum")
  let data={
    "qoutnum":qoutnum
  }
  console.log("num",data);
  this.http.getinvoicedata(data).subscribe(res=>{
    console.log("res",res);
   
  this.ServiceData.invoice=res[0].invoice

    this.ServiceData.title=res[0].title
    this.ServiceData.tax=res[0].tax
    this.ServiceData.city=res[0].city
    this.ServiceData.email=res[0].email
    this.ServiceData.phonenumber=res[0].phonenumber
    this.ServiceData.address=res[0].address
    this.ServiceData.country=res[0].country
    
for (var i=0; i <res.length; i++) {
  console.log(res.length);
    // const control = <FormArray>this.profileForm.controls['products'];
    // control.push(this.initiatProduct());
    const controlArrays = <FormArray> this.profileForm.get('products');
    controlArrays.controls[i].get('itemquan').setValue(res[i].itemquan);
    controlArrays.controls[i].get('itemname').setValue(res[i].itemname);
    controlArrays.controls[i].get('itemcost').setValue(res[i].itemcost);
    controlArrays.controls[i].get('price').setValue(res[i].price);
  }
  
  this.profileForm.controls['subtotal'].setValue(res[0].subtotal)
  this.profileForm.controls['vatper'].setValue(res[0].vatper)
  this.profileForm.controls['total'].setValue(res[0].total)


    
});
}


}
