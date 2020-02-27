import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { SettingsComponent } from './settings.component';
import { SettingsProfileComponent } from './components/settings-profile/settings-profile.component';
import { SettingsRoutingModule } from './settings-routing.module';

@NgModule({
  declarations: [
    SettingsComponent,
    SettingsProfileComponent,
  ],
  imports: [
    CommonModule,
    SettingsRoutingModule,
  ],
})
export class SettingsModule {
}
