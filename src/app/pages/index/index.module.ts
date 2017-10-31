import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { IndexRoutingModule } from './index-routing.module';
import { IndexComponent } from './index/index.component';
import { ResultComponent } from './result/result.component';

@NgModule({
  imports: [
    CommonModule,
    IndexRoutingModule
  ],
  declarations: [IndexComponent, ResultComponent]
})
export class IndexModule { }
