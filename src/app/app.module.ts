import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MainPageComponent } from './main-page/main-page.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap'

import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { LoginComponent } from './login/login.component';
import { AppMaterialModule } from './modules/app-material/app-material.module';
@NgModule({
  declarations: [
    AppComponent,
    MainPageComponent,
    LoginComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    NgbModule,
    FormsModule,
    ReactiveFormsModule,
    AppMaterialModule,
  ],
  bootstrap: [AppComponent],
  schemas: []
})
export class AppModule { }
