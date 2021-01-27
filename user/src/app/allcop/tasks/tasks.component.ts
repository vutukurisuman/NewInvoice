import { Component, OnInit } from '@angular/core';
import { HttpService } from '../../http.service';

import { FormBuilder } from '@angular/forms';
declare var $:any;
@Component({
  selector: 'app-tasks',
  templateUrl: './tasks.component.html',
  styleUrls: ['./tasks.component.scss'],
  
})
export class TasksComponent implements OnInit {
  nodata: boolean;
  data: boolean;
  getdata: any;
  length: any;
  lengths: any;
  completedata: any;
  datas: boolean;

  constructor(private http:HttpService,private formBuilder:FormBuilder,) { }

  TaskData={
    complt:""
  }

  ngOnInit() {
    // this.complete();
    this.getnewtask();
  }

  clear(TaskData){
    TaskData.name="",
    TaskData.descp="",
    TaskData.complt=""

  }
 
  sub(TaskData){
    console.log("data",TaskData);
    this.http.tasknew(TaskData).subscribe(res=>{
      console.log("rejjjjs",res);
      this.ngOnInit();
    });
 
  }

  // complete(){
  //   this.http.complttask().subscribe(res=>{
  //     console.log("comp",res);
  //     this.completedata=res
  //     this.lengths=res.length
  //     console.log("haiiiiii",this.lengths);

  //     if(this.lengths=='0'){
  //       this.nodata=true
  //       this.data=false
  //       console.log("haiiiiii");
        
  //     }
  //     else{
  //       this.nodata=false;
  //       this.data=true;
  //       this.datas=true
  //     }
  //   });
  // }

  getnewtask(){
    this.http.getnewtask().subscribe(res=>{
      console.log("rejjjjs",res);
      this.getdata=res
      this.length=res.length
     
 
    this.http.complttask().subscribe(res=>{
      console.log("comp",res);
      this.completedata=res
      this.lengths=res.length
      console.log("haiiiiii",this.lengths);

      if(this.lengths=='0' && this.length=='0' ){
        this.nodata=true
        this.data=false
        this.datas=false
        console.log("haiiiiii");
        
      }
      else{
        this.nodata=false;
        this.data=true;
        this.datas=true
      }
    });
  });
  }


edit(event){
  var tr = $(event.currentTarget).closest('tr')
  var inv = tr.find(".name").text(); 
  console.log("hbhbhm",inv);
  let data={
    "name":inv
  }
  this.http.editnew(data).subscribe(res=>{
    console.log("rejjjjs",res);
    for(let i=0;i<=res.length;i++){
      this.TaskData=res[0];    
    }
  }) 
}

 
delete(event){
  var tr = $(event.currentTarget).closest('tr')
  var inv = tr.find(".name").text(); 
  console.log("hbhbhm",inv);
  let data={
    "name":inv
  }
  this.http.deletenew(data).subscribe(res=>{
    console.log("rejjjjs",res);
  });
  this.ngOnInit()
}



}
