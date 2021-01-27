
import { Component, OnInit } from '@angular/core';
import {NgbCalendar, NgbDateStruct} from '@ng-bootstrap/ng-bootstrap';

import { FormBuilder, FormControl, FormGroup, FormArray } from '@angular/forms';
import { HttpService } from '../../http.service';

import Swal from 'sweetalert2';
import { Title } from '@angular/platform-browser';
import { Route } from '@angular/compiler/src/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-quotation',
  templateUrl: './quotation.component.html',
  styleUrls: ['./quotation.component.scss']

})
export class QuotationComponent implements OnInit {
year:number=new Date().getFullYear();


  universityname:any;
  currentDate = new Date();
  model: NgbDateStruct;
  model1: NgbDateStruct;
  today = this.calendar.getToday();
  vat:number;
  prices: number;

  products = [
    {
      itemname:'',
      itemcost:'',
      itemquan:'',
      price:'',
    }]
  profileForm: any;
  alldata: any[];
  selectedLevel: any;
  data: EventTarget;
  calcForm: FormGroup;
  quantiycal: any;
  costcal: any;
  percentcal: any;
  quonum: string;
  username: any;
  constructor(private calendar: NgbCalendar,public formBuilder: FormBuilder,private http:HttpService,private router:Router) { 
 
  }

  ngOnInit() {
    this.quotnum()
    this.username= JSON.parse(localStorage.getItem("mail"));
    
    this.profileForm = this.formBuilder.group({
      subtotal: new FormControl(),    
      vatper:new FormControl(),
      total:new FormControl(),
      products : this.formBuilder.array
      ([

      ])
    });
    this.calcForm = this.formBuilder.group({
      quantity: new FormControl(),    
      cost:new FormControl(),
      percent:new FormControl(),
      final:new FormControl(),

    });
    this.loadProducts(); 
    this.clients();
  }

 
 openNav() {
    document.getElementById("mySidepanel").style.width = "51%";
  }
  
 closeNav() {
    document.getElementById("mySidepanel").style.width = "0";
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
    paymentbank:"ICICI BANK ACC.NO:0382050003638",
    operator:""
  }

  clear(ServiceData){
    ServiceData.model1=""
    ServiceData.model="",
    ServiceData.invoice="",
    ServiceData.phonenumber="",
    ServiceData.email="",
    ServiceData.vat="",
    ServiceData.title="",
    ServiceData.address="",

    ServiceData.tax="",
    ServiceData.state="",
    ServiceData.country="",
    ServiceData.city="",
    ServiceData.discount="",
    ServiceData.comments="",
    ServiceData.paymentbank="",
   this.profileForm.reset();
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

    getName(i) {
      var arrayControl = this.profileForm.get('products') as FormArray;
      var item = arrayControl.value;
 
    const controlArray = <FormArray> this.profileForm.get('products');
    var itemcosts =  this.getControls()[i].value.itemcost;
    console.log("cost",itemcosts); 
    var itemquan = this.getControls()[i].value.itemquan;
    var prices=Math.round( (itemcosts * itemquan));
    controlArray.controls[i].get('price').setValue(prices);
    // var oemgs = this.getControls()[i].value.oemper;
    // var oemgsts =Math.round( (oemprice * proquan) * 0.18);
    // controlArray.controls[i].get('ourquan').setValue(proquan);
    
    // controlArray.controls[i].get('oemper').setValue(oemgsts);
    // var oemgs = this.getControls()[i].value.oemper;
    // var oemtot = (oemprice * proquan) + oemgs;
    // controlArray.controls[i].get('oemtotal').setValue(oemtot);
    // var ourperc = this.getControls()[i].value.ourper;
    // var unitprice = oemprice + (oemprice * (ourperc/100));
    // var ourquant =  this.getControls()[i].value.ourquan;
    // var amount = ourquant * unitprice;
    // controlArray.controls[i].get('uprice').setValue(unitprice); 
    // controlArray.controls[i].get('tamount').setValue(amount); 
    // var amounts = this.getControls()[i].value.tamount;
    // var ourrgst =Math.round( amounts * 18/100);
    
    // controlArray.controls[i].get('ourgst').setValue(ourrgst); 
    // var total =Math.round( ourrgst +amounts);
    // controlArray.controls[i].get('finalamt').setValue(total); 
    
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
    this.http.quotationpost(datain).subscribe(res=>{
      console.log("res",res);
      let dataclient={
        "email":dict[0].email,
      }
      this.http.clientquots(dataclient).subscribe(res=>{
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
        
        this.http.updateclientlength(data).subscribe(res=>{
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
  this.clear(this.ServiceData)

}

clientlengthupdate(){
  this.http.getquotation().subscribe(res=>{
    console.log("res",res);
    var length=res.length
    let data={
      "length":length
    }
    this.http.updateclientlength(data).subscribe(res=>{
      console.log("res",res);
    })
  })
}

clients(){
  this.http.getclient().subscribe(res=>{
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
  this.http.postdetails(names).subscribe(res=>{
    console.log("res",res);
    this.ServiceData.title=res[0].clientname
    this.ServiceData.tax=res[0].gst
    this.ServiceData.city=res[0].city
    this.ServiceData.email=res[0].email
    this.ServiceData.phonenumber=res[0].phonenumber
    this.ServiceData.address=res[0].address
    this.ServiceData.country=res[0].country
  });
}


calculation(event){
  this.quantiycal=this.calcForm.controls['quantity'].value
  this.costcal=this.calcForm.controls['cost'].value
  this.percentcal=this.calcForm.controls['percent'].value
  var grandtot=(this.quantiycal* this.costcal)
  var withper=grandtot+(grandtot*(this.percentcal/100))
  var finals=this.calcForm.controls['final'].setValue(withper)

}



backtolist(){
  this.router.navigate(['/quotationlist']);
}


quotnum(){
  // this.quonum = 'UPS'+ '/'+'ZZZ'+'/'+ this.year + '-' + (Math.floor(10 + Math.random() * 1234));
  var quonum = JSON.stringify ( Math.floor(Math.random() * (9000 - 1000 + 1) + 1000))
  this.ServiceData.invoice=  this.quonum 
  console.log("number",quonum);
  
  }

}
