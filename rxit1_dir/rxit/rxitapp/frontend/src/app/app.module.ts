import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FlexLayoutModule } from '@angular/flex-layout';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';

import { CustomMaterialModule } from './core/material.module';
import { AppRoutingModule } from './core/app.routing.module';

import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { UserComponent } from './user/user.component';
import { DispenserComponent } from './dispenser/dispenser.component';
import { PrescriberComponent } from './prescriber/prescriber.component';


@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    UserComponent,
    DispenserComponent,
    PrescriberComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    FormsModule,
    CustomMaterialModule,
    AppRoutingModule,
    FlexLayoutModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }

