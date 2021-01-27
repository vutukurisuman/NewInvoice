import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AdminRoutingModule } from './admin-routing.module';
import { AdminComponent } from './admin.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { RouterModule } from '@angular/router';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';


@NgModule({
  declarations: [AdminComponent, LoginComponent, RegisterComponent],
  imports: [
    CommonModule,
ReactiveFormsModule,FormsModule,
    AdminRoutingModule,
  ]
})
export class AdminModule { }
