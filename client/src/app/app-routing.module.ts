import { NgModule } from '@angular/core';
import {Routes, RouterModule, PreloadAllModules} from '@angular/router';
import {CoreComponent} from "./core/core.component";
import {HomeComponent} from "./core/components/home/home.component";
import {NotFoundComponent} from "./core/components/not-found/not-found.component";

const routes: Routes = [
  { path: '', component: CoreComponent, children: [
      { path: '', component: HomeComponent },
      // { path: 'protected', component: CoreBackupComponent, canActivate: [AuthGuard] }
      { path: '', loadChildren: () => import('./auth/auth.module').then(m => m.AuthModule) },
    ] },
  { path: '', redirectTo: '', pathMatch: 'full' },
  { path: '**', component: NotFoundComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
