import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';




const routes: Routes = [
  { path: '', redirectTo: '/users', pathMatch: 'full' },

 
  { path: 'allcop', loadChildren: () => import('./allcop/allcop.module').then(m => m.AllcopModule) },
  // { path: 'admin', loadChildren: () => import('./admin/admin.module').then(m => m.AdminModule) },
  { path: 'users', loadChildren: () => import('./users/users.module').then(m => m.UsersModule) },






];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
