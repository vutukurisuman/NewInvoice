import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { HttpService } from '../../http.service';
declare var $:any;

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {
  registerForm: FormGroup;
    submitted = false;

    constructor(private formBuilder: FormBuilder,private auth: HttpService, private router: Router) { }
    ngAfterViewInit(){
      $(function () {
        $('input, select').on('focus', function () {
            $(this).parent().find('.input-group-text').css('border-color', '#80bdff');
        });
        $('input, select').on('blur', function () {
            $(this).parent().find('.input-group-text').css('border-color', '#ced4da');
        });
    }); }


   
    ngOnInit() {
        this.registerForm = this.formBuilder.group({
            firstName: ['', Validators.required],
            lastName: ['', Validators.required],
            email: ['', [Validators.required, Validators.email]],
            password: ['', [Validators.required, Validators.minLength(6)]],
            phonenumber: ['', Validators.required],
            // conformpassword: ['', Validators.required],
            empid: ['', Validators.required],
            // user: ['', Validators.required],

        },
        );
    }
    // MustMatch(controlName: string, matchingControlName: string) {
    //   return (formGroup: FormGroup) => {
    //       const control = formGroup.controls[controlName];
    //       const matchingControl = formGroup.controls[matchingControlName];
    
    //       if (matchingControl.errors && !matchingControl.errors.mustMatch) {
    //           return;
    //       }
    
    //       if (control.value !== matchingControl.value) {
    //           matchingControl.setErrors({ mustMatch: true });
    //       } else {
    //           matchingControl.setErrors(null);
    //       }
    //   }
    // }
    // convenience getter for easy access to form fields
    get f() { return this.registerForm.controls; }

    onSubmit() {
        this.submitted = true;

        // stop here if form is invalid
        if (this.registerForm.invalid) {
            return;
        }
       
        console.log('fdfghjkk',this.registerForm.value);
        
        this.auth.register(this.registerForm.value).subscribe(
          res => {
            this.router.navigateByUrl('admin/adminlogin')
            var resp=JSON.stringify(res)
            alert(resp)
            console.log(res);
            
          },
          err => {
            console.error(err)
          }
        )
    }
 
  
 
 

 

}
