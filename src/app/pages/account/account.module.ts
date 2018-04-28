import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AccountRoutingModule } from './account-routing.module';
import { ListComponent } from './list/list.component';
import { FormsModule } from "@angular/forms";
@NgModule({
  imports: [
    CommonModule,
    AccountRoutingModule,
    FormsModule
  ],
  declarations: [ListComponent]
})
export class AccountModule { }
