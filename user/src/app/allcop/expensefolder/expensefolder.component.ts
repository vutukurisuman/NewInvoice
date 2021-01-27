import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-expensefolder',
  templateUrl: './expensefolder.component.html',
  styleUrls: ['./expensefolder.component.scss']
})
export class ExpensefolderComponent implements OnInit {
year:number=new Date().getFullYear();

  constructor(private router:Router) { 
   
  }

  ngOnInit() {
  }

  month(){
    this.router.navigate(['/allcop/expmonthfolder'])
  }

}
