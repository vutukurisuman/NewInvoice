import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import Swal from 'sweetalert2';
import { HttpService } from 'src/app/http.service';

@Component({
  selector: 'app-message',
  templateUrl: './message.component.html',
  styleUrls: ['./message.component.scss']
})
export class MessageComponent implements OnInit {
  registerForm: FormGroup;
  submitted = false;
  userdata: any;
  valid: string;
  messagesarray: any;

  constructor(private formBuilder: FormBuilder,private auth:HttpService) { }

  ngOnInit() {
      this.registerForm = this.formBuilder.group({
        firstName: ['', Validators.required],
      });
      this.userdata=JSON.parse(localStorage.getItem("mail"));
      let data={
        "email": this.userdata.email
      }
    //  console.log("hgjk",data);

      this.auth.particularmessage(data).subscribe(res=>{
     console.log("hgjk",res);
     this.messagesarray=res[0].Allmessages
     window.scrollTo(0, 330);
      })
  }

  get f() { return this.registerForm.controls; }

    onSubmit() {
        this.submitted = true;
this.userdata=JSON.parse(localStorage.getItem("mail"));
        // stop here if form is invalid
        if (this.registerForm.invalid) {
            return;
        }
        let data={
          "message": this.registerForm.controls['firstName'].value,
          "operator":'Emp',
          "email":this.userdata.email ,
        }
        console.log("ff",data);
        this.auth.newmessage(data).subscribe(res=>{
          console.log("mess",res);
          Swal.fire({
           text: "Success",
           icon: 'success',
           confirmButtonText: 'Ok'
         });
        })
    }


    messagearray(){

this.userdata=JSON.parse(localStorage.getItem("mail"));
      let data={
        "message": this.registerForm.controls['firstName'].value,
        "operator":'Emp',
        "email":this.userdata.email ,
      }
      if(this.registerForm.controls['firstName'].value==""){
        this.valid="Please enter your message"
      }
      else {
      console.log("ff",data);
      this.auth.messagepush(data).subscribe(res=>{
        console.log("toarray",res);
        Swal.fire({
         text: "Success",
         icon: 'success',
         confirmButtonText: 'Ok'
       });
    
      });
      this.ngOnInit()
     }
   
    }
  	
messages(){
  this.userdata=JSON.parse(localStorage.getItem("mail"));
      let data={
        "email": this.userdata.email
      }
  this.auth.particularmessage(data).subscribe(res=>{
    var alldata=res
    console.log("length",res.length);

   if(alldata.length===0){
    this.onSubmit()
   }
  else if(alldata.length>0){
    this.messagearray()
   }
  });
  
}
  

}
