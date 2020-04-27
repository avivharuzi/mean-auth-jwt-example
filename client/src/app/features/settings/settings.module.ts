import { CommonModule } from '@angular/common';
import { GravatarModule } from 'ngx-gravatar';
import { NgModule } from '@angular/core';

import { MaterialModule } from '../../material/material.module';
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
    GravatarModule,
    MaterialModule,
    SettingsRoutingModule,
  ],
})
export class SettingsModule {
}
