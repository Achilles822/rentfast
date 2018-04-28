import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from "@angular/forms";

import { IndexRoutingModule } from './index-routing.module';
import { IndexComponent } from './index/index.component';
import { ResultComponent } from './result/result.component';
import { TipComponent } from './tip/tip.component';

@NgModule({
  imports: [
    CommonModule,
    IndexRoutingModule,
    FormsModule
  ],
  declarations: [IndexComponent, ResultComponent, TipComponent]
})
export class IndexModule { }
