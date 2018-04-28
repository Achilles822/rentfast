import { Component, OnInit, Directive } from '@angular/core';
import { FileSelectDirective, FileDropDirective, FileUploader } from 'ng2-file-upload/ng2-file-upload';
import { ProductAddService } from './add.service';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { Observable } from 'rxjs/Rx';
import { Http, Headers, RequestOptions } from '@angular/http';
import { Router, NavigationEnd, ActivatedRoute } from '@angular/router';


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
  public operate:any;

  public id:any;

  public files: File[];
  // 商家填写信息：商品名称、单价、分类、数量、上架
  public houseInfo = {
    house_title:"",
    house_description:"",
    house_landlord:"",
    house_phone_number:"",
    house_rental:"",
    house_country:"",
    house_province:"",
    house_city:"",
    house_block:"",
    house_area:"",
    house_houses:"",
    house_tenant:"",
    house_final_rental:0,
    house_tenancy:"",
    house_room:"",
    house_hall:"",
    house_bathroom:"",
    house_achievement:"",
    house_direction:"",
    house_for_rent:0,
    house_is_check:0,
    house_fitment:"",
    path:[]
  }

  public filePath = [];
  public uploader: FileUploader = new FileUploader({ url: URL, method: "POST" });
  public hasBaseDropZoneOver: boolean = false;
  public hasAnotherDropZoneOver: boolean = false;


  constructor(
    private route: ActivatedRoute,
    private productAddService: ProductAddService,
    public http: Http,
    public router: Router,
  ) { 
    this.route.params.subscribe((data)=>{
      this.operate = data.operate;
      this.id = data.id
    })
  }


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

  ngOnInit() {
    this.loadlist();
  }
  public setFile(files) {
    this.files = files;
  }
  public uploadFile() {
    const formData: FormData = new FormData();
    const url = 'http://localhost:3018/upload';
    console.log(this.files);
    for (let i = 0; i < this.files.length; i++) {
      formData.append("file", this.files[i]);
    }
    /*     formData.append('file', this.file); */
/*     formData.append('data', JSON.stringify({ city: 'jy', province: 'GD' }));
 */    let headers = new Headers();
    headers.append('Accept', 'application/json');
    let options = new RequestOptions({ headers: headers });
    this.http.post(url, formData, options)
      .map(res => res.json())
      .catch(error => Observable.throw(error))
      .subscribe(data => {
        console.log(data.data);
        this.houseInfo.path = data.data[0].path;
        for (let i = 0; i < data.data.length; i++) {
          console.log(data.data[i].path);
          /*    this.product.path.push(data.data[i].path) */
          this.filePath.push(data.data[i].path);
          this.houseInfo.path = this.filePath;
        }
      })
    /* fetch('http://localhost:3018/upload', {
      method: 'POST',
      body: formData
    }).then(function(aa,bb){
      console.log
    }) */

    /*  console.log(res.data); */

    /*     this.productAddService.upload(this.file).subscribe(data =>{
          console.log(data);
        }) */
  }
  // 新增房源
  addHouse() {
    console.log(this.houseInfo);
    let headers = new Headers();
    headers.append('Accept', 'application/json');
    let options = new RequestOptions({ headers: headers });
    this.productAddService.add(this.houseInfo, options).subscribe(data => {
      console.log(data);
      if(data){
        window['swal']('提示', '发布成功，待管理员审核房源', 'success');
        this.router.navigateByUrl("pages/products/list");
      }
    })
  }
  // 编辑房源
  editHouse(){
    let postbody = {
      where:{
        house_id:this.id
      },
      values:this.houseInfo
    }
    this.productAddService.edit(postbody).subscribe((data)=>{
      if(data){
        window['swal']('提示', '修改房源信息成功', 'success');
      }else{
        window['swal']('提示', '修改房源信息失败', 'success');
      }
    })
  }
  loadlist(){
    if(this.id!=='new'){
      let postbody = {
        where:
          {
            house_id: this.id
          }
        }
this.productAddService.list(postbody).subscribe((data)=>{
  this.houseInfo = data.list[0];
})
    }
  }

}
