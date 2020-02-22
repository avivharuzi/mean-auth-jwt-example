import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { LoginGuard } from './shared/login.guard';
import { LoginComponent } from "./components/login/login.component";

const routes: Routes = [{ path: 'login', component: LoginComponent, canActivate: [LoginGuard] }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AuthRoutingModule { }
