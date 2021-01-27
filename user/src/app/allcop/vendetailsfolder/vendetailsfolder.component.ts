import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-vendetailsfolder',
  templateUrl: './vendetailsfolder.component.html',
  styleUrls: ['./vendetailsfolder.component.scss']
})
export class VendetailsfolderComponent implements OnInit {

  constructor(private router:Router) { }
   MyArrayType = [
    // {id: 1, folder: 'Quotation'},
    {id: 2, folder: 'Purchase'},
   
];
  ngOnInit() {
   
  }

  alldata(fol,i){
    
    console.log("fgfg",fol.folder);
    localStorage.setItem("type",fol.folder);
    this.router.navigate(['/vpurchaselist'])
  }

 
}
