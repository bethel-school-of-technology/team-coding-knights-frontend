import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http'; 
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap'

import { AppComponent } from './app.component';
import { MainPageComponent } from './main-page/main-page.component';
import { RegisterPageComponent } from './register-page/register-page.component';
import { LoginComponent } from './login/login.component';

import { AppRoutingModule } from './app-routing.module';
import { AppMaterialModule } from './modules/app-material/app-material.module';
import { AccountPageModule } from './account-page/account-page.module';
import { NavbarModule } from './navbar/navbar.module';

import { UserAccountService } from './services/UserAccount/user-account.service';
import { QuotesService } from './services/Quotes/quotes.service';


@NgModule({
  declarations: [
    AppComponent,
    MainPageComponent,
    LoginComponent,
    RegisterPageComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    FormsModule,
    AppRoutingModule,
    ReactiveFormsModule,
    HttpClientModule,
    NgbModule,
    AppMaterialModule,
    NavbarModule,
    AccountPageModule
  ],
  providers: [
    UserAccountService,
    QuotesService
  ],
  bootstrap: [AppComponent],
  schemas: []
})
export class AppModule { }
