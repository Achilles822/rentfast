import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ProductsRoutingModule } from './products-routing.module';
import { ProductListComponent } from './list/list.component';
import { FormsModule } from "@angular/forms";
import { ProductAddComponent } from './add/add.component';
import { FileUploadModule } from 'ng2-file-upload';
import { QuillModule } from 'ngx-quill';
import {KSSwiperModule} from "angular2-swiper";
@NgModule({
  imports: [
    CommonModule,
    ProductsRoutingModule,
    FormsModule,
    FileUploadModule,
    QuillModule,
    KSSwiperModule

  ],
  declarations: [ProductListComponent, ProductAddComponent]
})
export class ProductsModule { }
