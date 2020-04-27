import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { SettingsComponent } from './settings.component';
import { SettingsProfileComponent } from './components/settings-profile/settings-profile.component';

const routes: Routes = [
  {
    path: '', component: SettingsComponent, children: [
      { path: 'profile', component: SettingsProfileComponent },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class SettingsRoutingModule {
}
