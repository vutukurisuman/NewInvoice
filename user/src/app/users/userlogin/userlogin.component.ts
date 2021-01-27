import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { HttpService } from '../../http.service';
import { NgxIndexedDBService } from 'ngx-indexed-db';
import { Ng2DeviceDetectorModule } from 'ng2-device-detector';
import { formatDate } from '@angular/common';


@Component({
  selector: 'app-userlogin',
  templateUrl: './userlogin.component.html',
  styleUrls: ['./userlogin.component.scss']
})
export class UserloginComponent implements OnInit {
  loginform: FormGroup;
  tabinfo: any;
  array: any;
  array1: any;
  array2: any;
  array3: any;
  message: any;
  record: boolean;
  
  deviceInfo:any;
  jstoday = ''; 
  today= new Date();
  ipAddress:any;
  email:any;


  constructor( private router:Router,private http:HttpService,private dbService: NgxIndexedDBService,private deviceService: Ng2DeviceDetectorModule) { }
 
  ngOnInit() {
    this.loginform = new FormGroup({
      email: new FormControl('',Validators.required),
      password: new FormControl('', Validators.required),
      
      });
      this.dbService.getAll('people').subscribe((peoples) => {
        console.log(peoples);
      });
    
      
  }

  migrationFactory() {
    // The animal table was added with version 2 but none of the existing tables or data needed
    // to be modified so a migrator for that version is not included.
    return {
      1: (db, transaction) => {
        const store = transaction.objectStore('people');
        store.createIndex('country', 'country', { unique: false });
      },
      3: (db, transaction) => {
        const store = transaction.objectStore('people');
        store.createIndex('age', 'age', { unique: false });
      }
    };
  }
	userlogin(){
    //login
    //  var email=this.loginform.controls['email'].value
    //  var password=this.loginform.controls['password'].value
    //  this.dbService.getByIndex('people', 'email',email).subscribe((people) => {
    //   console.log("email",people);
    //   if(email===people.email && password===people.name){
    //   console.log("hey doneeeeee",);

    //   }
    // });
    let data={
      "email":this.loginform.controls['email'].value,
      "password":this.loginform.controls['password'].value	
    }
    
	this.http.userProfile(data).subscribe(res=>{
  console.log("rses",res);
  
	
			localStorage.setItem("mail",JSON.stringify(res.user));
      this.router.navigate(['/allcop/dashboard'], { replaceUrl: true });
      
    // this.dbService.add('people', {
    //   name: res.user.password,
    //   email: res.user.email,
    // })
    // .subscribe((key) => {
    //   console.log('key: ', key);
      this.jstoday = formatDate(this.today, 'dd-MM-yyyy hh:mm:ss a', 'en-US', '+0530');
      // });
    this.http.getIPAddress().subscribe((res:any)=>{
      this.ipAddress=res.ip;
      this.email=this.loginform.controls['email'].value;
    let da={
      "email":this.email,
      "logintime":this.jstoday,
      "ip":this.ipAddress,
      "logouttime":"0"

    }
    console.log("da values",da);
    
    this.http.logindata(da).subscribe(res=>{

      console.log("login res",res);
      
    })
  });
    },err=>{
			if(err.error.status==false){
				this.message=err.error.message
        console.log(this.message)
        this.record=true
      }
      }
    );
   
	}

}
