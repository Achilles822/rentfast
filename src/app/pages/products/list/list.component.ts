import { Component, OnInit ,Input, Output, EventEmitter, ViewChild} from '@angular/core';
import { ProductEditComponent } from "../edit/edit.component";
import * as _ from 'lodash'
import { HttpClientService } from '../../../services/http-client.service';
import { Router, NavigationEnd } from '@angular/router';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.css']
})
export class ProductListComponent implements OnInit {
	@ViewChild(ProductEditComponent) productEditComponent: ProductEditComponent;
  constructor(
    public httpClient: HttpClientService,
    public router: Router
  ) {

   }

  ngOnInit() {
  }
  editProduct(){
    // console.log(1111);
    window['$'](".product-edit-modal").modal('show');
  }
  // 新增商品
  addProduct(){
    this.router.navigateByUrl('pages/products/add');
  }
}
