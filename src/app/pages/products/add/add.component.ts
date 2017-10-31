import { Component, OnInit, Directive } from '@angular/core';
import { FileSelectDirective, FileDropDirective, FileUploader } from 'ng2-file-upload/ng2-file-upload';
import { ProductAddService } from './add.service';
// const URL = '/api/';
const URL = 'http://127.0.0.1:3018/upload/';
@Component({
  selector: 'app-add',
  templateUrl: './add.component.html',
  styleUrls: ['./add.component.scss'],
  providers: [ProductAddService]
})
@Directive({ selector: '[ng2FileSelect]' })
@Directive({ selector: '[ng2FileDrop]' })


export class ProductAddComponent implements OnInit {

  // 商家填写信息：商品名称、单价、分类、数量、上架
  public product = {
    productName: '',
    productPrice: '',
    productType: '',
    productCount: '',
    productStatus: ''
  }


  public uploader: FileUploader = new FileUploader({ url: URL, method: "POST" });
  public hasBaseDropZoneOver: boolean = false;
  public hasAnotherDropZoneOver: boolean = false;

  public fileOverBase(e: any): void {
    this.hasBaseDropZoneOver = e;
  }

  public fileOverAnother(e: any): void {
    this.hasAnotherDropZoneOver = e;
  }
  selectedFileOnChanged() {
    // 这里是文件选择完成后的操作处理
    console.log('已选择了一个文件');
  }

  constructor(
    private productAddService: ProductAddService
  ) { }

  ngOnInit() {
  }
  addProduct() {
    this.productAddService.list(this.product).subscribe(data => {
      console.log(data);
    })
  }

}
