import { Component, OnInit } from '@angular/core';
import { HttpService } from '../../http.service';


@Component({
  selector: 'app-monthexpense',
  templateUrl: './monthexpense.component.html',
  styleUrls: ['./monthexpense.component.scss']
})
export class MonthexpenseComponent implements OnInit {
month;
expdata;
  constructor(private http:HttpService) { }

  ngOnInit() {
    this.month=localStorage.getItem("month")
    let data={"month":this.month}
    
    this.http.getmonthexp(data).subscribe((res)=>{
       this.expdata=res;
       console.log("monthexpdata",this.expdata)
    })
     
  }

}
