import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-clientfolder',
  templateUrl: './clientfolder.component.html',
  styleUrls: ['./clientfolder.component.scss']
})
export class ClientfolderComponent implements OnInit {

  constructor(private router:Router) { }
   MyArrayType = [
    {id: 1, folder: 'Quotation'},
    // {id: 2, folder: 'Purchase Order'},
    {id: 3, folder: 'Delivery Challan'},
    {id: 4, folder: 'Invoice'},
];
  ngOnInit() {
   
  }

  alldata(fol,i){
    
    console.log("fgfg",fol.folder);
    localStorage.setItem("type",fol.folder);
    if(fol.folder==="Quotation"){
      this.router.navigate(['/allcop/alldata'])
    }
    if(fol.folder==="Purchase Order"){
      this.router.navigate(['/allcop/purchasefolder'])
    }
    if(fol.folder==="Delivery Challan"){
      this.router.navigate(['/allcop/deliveryfolder'])
    }
    if(fol.folder==="Invoice"){
      this.router.navigate(['/allcop/folderinvoice'])
    }
  }

  back(){
    this.router.navigate(['/allcop/invoicefolder'])

  }
}
