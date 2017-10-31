import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { ProductEditService } from './edit.service';

@Component({
  selector: 'product-edit',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.scss'],
  providers: [ProductEditService]
})
export class ProductEditComponent implements OnInit {
  
  public products:any={
    name:'',
    count:''
  };


  constructor(
    private productEditService: ProductEditService
  ) { }

  ngOnInit() {
  }
  
  saveProduct(){
    // let that = this;
    console.log(this.products);
     this.productEditService.list(this.products).subscribe(data=>{
        console.log('1111212121');
    })
    // console.log(this.products.name+'====='+this.products.count);
    
  }
}
