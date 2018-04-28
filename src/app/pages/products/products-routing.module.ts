import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { Router } from '@angular/router';
import { ProductListComponent } from './list/list.component';
import { ProductAddComponent } from './add/add.component';
const routes: Routes = [
	 {
		path: "list",
		component: ProductListComponent
	},
	{
		path: "list/:operate/:id",
		component: ProductAddComponent
	}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ProductsRoutingModule { }
