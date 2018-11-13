import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FlexLayoutModule } from '@angular/flex-layout';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { CustomMaterialModule } from './core/material.module';
import { AppRoutingModule } from './core/app.routing.module';

import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { UserComponent } from './user/user.component';
import { DispenserComponent } from './dispenser/dispenser.component';
import { PrescriberComponent } from './prescriber/prescriber.component';

import { UserService } from './core/user.service';
import { UserTestService } from './data/user_test.service';



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
    ReactiveFormsModule,
    CustomMaterialModule,
    AppRoutingModule,
    FlexLayoutModule
  ],
  providers: [UserService, UserTestService],
  bootstrap: [AppComponent]
})
export class AppModule { }

