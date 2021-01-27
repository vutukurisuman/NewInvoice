import { Component, OnInit } from '@angular/core';
import { HttpService } from '../../http.service';

import { Router } from '@angular/router';

@Component({
  selector: 'app-expmonthfolder',
  templateUrl: './expmonthfolder.component.html',
  styleUrls: ['./expmonthfolder.component.scss']
})
export class ExpmonthfolderComponent implements OnInit {
archive:any;
  archivedata: any[];
  constructor(private ser:HttpService,private router:Router) { }

  ngOnInit() {
    var status="Active"
    let data={
      "archive":status
    }
    this.ser.getarchiveexpense(data).subscribe(res=>{
      console.log("rejjjjs",res);
          //  function removeDuplicates() { 
            // Declare a new array 
            let newArrays = [];          
            // Declare an empty object 
            let uniqueObject = {};          
            // Loop for the array elements 
            for (let i in res) { 
                // Extract the title 
                // ---console.log("createdd",res[i]['created'].month)
                const objTitle = res[i]['created'].month;  
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
               console.log("months array data",this.archivedata)
            
            }
     });
     
  
  }
  monthdata(x){
    //  localStorage.setItem("month",x);
     this.router.navigate(['monthexpense'])
  }

}
