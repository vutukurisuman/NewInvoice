import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AdminComponent } from './admin.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';

const routes: Routes = [{ path: '', component: LoginComponent},
{ path: 'adminregister', component: RegisterComponent },
{ path: 'adminlogin', component: LoginComponent },


// children:[


//   { path: 'adminlogin', component: LoginComponent },
// { path: 'adminregister', component: RegisterComponent },
// ]
// },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminRoutingModule { }
