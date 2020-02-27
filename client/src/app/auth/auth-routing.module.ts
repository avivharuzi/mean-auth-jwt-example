import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { LoginComponent } from './components/login/login.component';
import { LoginGuard } from './shared/login.guard';

const routes: Routes = [{ path: 'login', component: LoginComponent, canActivate: [LoginGuard] }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AuthRoutingModule {
}
