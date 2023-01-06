import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from './dashboard/dashboard.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { TransactionComponent } from './transaction/transaction.component';

const routes: Routes = [
  {
    // root for the login page
    path:'',component:LoginComponent
  },
  {
  // path for register
  path:'register',component:RegisterComponent
},
// dashboard
{
  path:'dashboard',component:DashboardComponent
},
// transaction
{
  path:'transaction',component:TransactionComponent
}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
