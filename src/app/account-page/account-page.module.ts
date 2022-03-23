import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AccountPageComponent } from './account-page/account-page.component';
import { QuotesListComponent } from './quotes-list/quotes-list.component';
import { UserControlsComponent } from './user-controls/user-controls.component';
import { QuoteComponent } from './quote/quote.component';

import { AppMaterialModule } from '../modules/app-material/app-material.module';
import { ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    AccountPageComponent,
    QuotesListComponent,
    UserControlsComponent,
    QuoteComponent
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    AppMaterialModule
  ],
  exports: [
    AccountPageComponent
  ]
})
export class AccountPageModule { }
