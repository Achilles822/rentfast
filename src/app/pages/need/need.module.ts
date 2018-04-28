import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from "@angular/forms";

import { NeedRoutingModule } from './need-routing.module';
import { ListComponent } from './list/list.component';

@NgModule({
  imports: [
    CommonModule,
    NeedRoutingModule,
    FormsModule
  ],
  declarations: [ListComponent]
})
export class NeedModule { }
