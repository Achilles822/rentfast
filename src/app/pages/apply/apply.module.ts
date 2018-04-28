import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from "@angular/forms";

import { ApplyRoutingModule } from './apply-routing.module';
import { ListComponent } from './list/list.component';

@NgModule({
  imports: [
    CommonModule,
    ApplyRoutingModule,
    FormsModule
  ],
  declarations: [ListComponent]
})
export class ApplyModule { }
