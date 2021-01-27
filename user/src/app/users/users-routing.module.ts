import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { UsersComponent } from './users.component';
import { UserloginComponent } from './userlogin/userlogin.component';

const routes: Routes = [{ path: '', component: UserloginComponent },
{ path: 'userlogin', component: UserloginComponent },];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UsersRoutingModule { }
