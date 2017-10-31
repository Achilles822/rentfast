import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ProductsRoutingModule } from './products-routing.module';
import { ProductListComponent } from './list/list.component';
import { ProductEditComponent } from './edit/edit.component';
import { FormsModule } from "@angular/forms";
import { ProductAddComponent } from './add/add.component';
import { FileUploadModule } from 'ng2-file-upload';

@NgModule({
  imports: [
    CommonModule,
    ProductsRoutingModule,
    FormsModule,
    FileUploadModule
  ],
  declarations: [ProductListComponent, ProductEditComponent, ProductAddComponent]
})
export class ProductsModule { }
