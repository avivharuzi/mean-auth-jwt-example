import { CommonModule } from '@angular/common';
import { GravatarModule } from 'ngx-gravatar';
import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';

import { CoreComponent } from './core.component';
import { HeaderComponent } from './shared/components/header/header.component';
import { HomeComponent } from './components/home/home.component';
import { MaterialModule } from '../material/material.module';
import { NotFoundComponent } from './components/not-found/not-found.component';
import { SharedModule } from '../shared/shared.module';
import { SignupComponent } from './components/signup/signup.component';

@NgModule({
  declarations: [
    CoreComponent,
    HeaderComponent,
    HomeComponent,
    NotFoundComponent,
    SignupComponent,
  ],
  imports: [
    CommonModule,
    GravatarModule,
    HttpClientModule,
    MaterialModule,
    ReactiveFormsModule,
    RouterModule,
    SharedModule,
  ],
  exports: [
    HomeComponent,
    NotFoundComponent,
  ],
})
export class CoreModule {
}
