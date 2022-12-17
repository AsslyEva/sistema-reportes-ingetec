import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
// import { LoginGuard } from 'src/app/service/auth/login-guard.service';
import { LoginComponent } from './login.component';

const routes: Routes = [
  { path: '', component: LoginComponent, canActivate: [] },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class LoginRoutingModule { }
