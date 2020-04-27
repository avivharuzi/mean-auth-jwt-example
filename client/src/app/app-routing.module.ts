import { NgModule } from '@angular/core';
import { Routes, RouterModule, PreloadAllModules } from '@angular/router';

import { AuthGuard } from './auth/shared/auth.guard';
import { CoreComponent } from './core/core.component';
import { HomeComponent } from './core/components/home/home.component';
import { LoginGuard } from './auth/shared/login.guard';
import { NotFoundComponent } from './core/components/not-found/not-found.component';
import { SignupComponent } from './core/components/signup/signup.component';

const routes: Routes = [
  {
    path: '', component: CoreComponent, children: [
      { path: '', component: HomeComponent },
      { path: 'signup', component: SignupComponent, canActivate: [LoginGuard] },
      {
        path: 'settings',
        loadChildren: () => import('./features/settings/settings.module').then(m => m.SettingsModule),
        canActivate: [AuthGuard],
      },
      { path: '', loadChildren: () => import('./auth/auth.module').then(m => m.AuthModule) },
      { path: '**', component: NotFoundComponent },
    ],
  },
  { path: '', redirectTo: '', pathMatch: 'full' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })],
  exports: [RouterModule],
})
export class AppRoutingModule {
}
