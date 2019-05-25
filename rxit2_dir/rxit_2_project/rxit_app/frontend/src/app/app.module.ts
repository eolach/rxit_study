import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FlexLayoutModule } from '@angular/flex-layout';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import {MatSelectModule} from '@angular/material/select';

import { CustomMaterialModule } from './core/material.module';
import { AppRoutingModule } from './core/app.routing.module';

import { HttpClientModule } from '@angular/common/http';

import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { UserComponent } from './user/user.component';
import { DispenserComponent } from './dispenser/dispenser.component';
import { PrescriberComponent } from './prescriber/prescriber.component';

import { UserService } from './core/user.service';
import { UserHttpService } from './data/user_http.service';
import { ReviewerComponent } from './reviewer/reviewer.component';



@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    UserComponent,
    DispenserComponent,
    PrescriberComponent,
    ReviewerComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    CustomMaterialModule,
    AppRoutingModule,
    FlexLayoutModule,
    MatSelectModule
  ],
  providers: [UserService, UserHttpService],
  bootstrap: [AppComponent]
})
export class AppModule { }

