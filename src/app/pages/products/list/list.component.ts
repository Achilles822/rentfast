import { Component, OnInit, Input, Output, EventEmitter, ViewChild } from '@angular/core';
import * as _ from 'lodash'
import { HttpClientService } from '../../../services/http-client.service';
import { Router, NavigationEnd } from '@angular/router';
import { ListService } from './list.service';
import { environment } from '../../../../environments/environment';
import { Util } from '../../../common/util';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.css'],
  providers: [ListService, Util]
})
export class ProductListComponent implements OnInit {
  constructor(
    public httpClient: HttpClientService,
    public router: Router,
    public listService: ListService,
    private util: Util
  ) {

  }
  public user: any;

  public role: any;

  public user_id: any;

  public pageData: any = {
  total:''
  };

  public willData: any;

  public houseList: any;

  public pageIndex: any = 1;

  public pageSize: any = environment.pageSize;

  public pages: any = [];
  ngOnInit() {
    this.user = JSON.parse(sessionStorage.getItem('user'));
    // console.info(this.user.role);
    this.role = this.user.role;

    this.user_id = this.user.id;

    this.loadList(this.pageIndex);
  }
  // 新增商品
  addProduct() {
    this.router.navigateByUrl('pages/products/list/add/new');
  }

  // 获取列表
  loadList(index?) {
    let conditions: any = {};
    // if (this.name) {
    //   condictions.name = {
    //     "$like": "%" + this.name + "%"
    //   };
    // }
    if (this.role == 'admin') {
      this.listService.list({
        pageIndex: index ? index : parseInt(this.pageIndex),
        pageSize: parseInt(this.pageSize),
        conditions: conditions
      }).subscribe((data) => {
        if (data) {
          this.houseList = data.list;
          this.pageData = data;
          this.pageIndex = data.pageIndex;
          this.pages = this.util.setPage(data.pageSize, data.total, this.pageIndex);
        }
      });
    }
    else if (this.role == 'landlord') {
      this.listService.list({
        pageIndex: index ? index : parseInt(this.pageIndex),
        pageSize: parseInt(this.pageSize),
          where: {
            user_id: this.user_id
          }
        
      }).subscribe((data) => {
        if (data) {
          this.houseList = data.list;
          this.pageData = data;
          this.pageIndex = data.pageIndex;
          this.pages = this.util.setPage(data.pageSize, data.total, this.pageIndex);
        }
      });
    }
  }

  delHouse(item){
    let postbody = {
      house_id:item.house_id
    }

    let delbody = {
      "where":{
        "house_id":item.house_id
      },
      "values":{
        "house_is_check":0
      }
    }
    window['swal']({
      title: "提示",
      text: "请确认是否删除该房源？",
      icon: "warning",
      dangerMode: false,
      buttons: ["取消", "确定"],
    })
      .then((willDelete) => {
        if (willDelete) {
          this.listService.del(postbody).subscribe((data) => {
            if (data) {
              this.listService.edit(delbody).subscribe((data)=>{
                if(data)
                {
              window['swal']('提示', '删除成功', 'success');
              this.loadList();
                }
              })
             
            }
            else {
              window['swal']('提示', '删除失败', 'error');
            }
          })
        } else {
          // window['swal']("Your imaginary file is safe!");
        }
      });
  }
  // 审核操作
  shenHe(item) {
    let that = this;
    let postbody = {
      "where": {
        "house_id": item.house_id
      },
      "values": {
        "house_is_check": "1"
      }
    }

    window['swal']({
      title: "提示",
      text: "请确认是否审核该房源？",
      icon: "warning",
      dangerMode: false,
      buttons: ["取消", "确定"],
    })
      .then((willDelete) => {
        if (willDelete) {
          this.listService.shenHe(postbody).subscribe((data) => {
            if (data) {
              window['swal']('提示', '审核成功', 'success');
              this.loadList();
            }
            else {
              window['swal']('提示', '审核失败', 'error');
            }
          })
        } else {
          // window['swal']("Your imaginary file is safe!");
        }
      });



  }
  showWill(item) {
    let postbody = {
      "where": {
        "house_id": item.house_id
      }
    };
    this.listService.yiXiang(postbody).subscribe((data) => {
      if (data) {
        console.log(data);
        this.willData = data.list
        window['$'](".yixiang-modal").modal('show');
      }
    })
  }

  // 编辑信息
  editHouse(item){
console.log(item);
     this.router.navigateByUrl('pages/products/list/edit/'+item.house_id);
  }
  // 换页
  changePage = function (type, index) {
    var pageCount = Math.ceil(this.listData.total / this.listData.pageSize);
    if (type === 'pre') {
      if (this.pageIndex - 1 > 0) {
        this.pageIndex = this.pageIndex - 1;
        this.loadList(this.pageIndex);
      }
    } else if (type === 'next') {
      if ((this.pageIndex + 1) <= pageCount) {
        this.pageIndex = this.pageIndex + 1;
        this.loadList(this.pageIndex);
      }
    } else {
      this.pageIndex = index;
      this.loadList(this.pageIndex);
    }

  }
}
