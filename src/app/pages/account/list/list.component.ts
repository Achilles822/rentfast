import { Component, OnInit } from '@angular/core';
import { ListService } from './list.service';
import { environment } from '../../../../environments/environment';
import { Util } from '../../../common/util';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss'],
  providers: [ListService, Util]
})
export class ListComponent implements OnInit {

  public pageIndex = 1;

  public total: any;

  public pageSize: any = environment.pageSize;

  public pages: any = [];

  public userList: any;

  public userInfo:any = {
    username:'',
    password:'',
    email:'',
    mobile:'',
    role:'user'
  };

  constructor(
    public listService: ListService,
    private util: Util
  ) { }

  ngOnInit() {
    this.loadlist();
  }

  loadlist(index?) {
    let conditions: any = {};
    // if (this.name) {
    //   condictions.name = {
    //     "$like": "%" + this.name + "%"
    //   };
    // }
    this.listService.list({
      pageIndex: index ? index : this.pageIndex,
      pageSize: parseInt(this.pageSize),
      condictions: conditions
    }).subscribe(data => {
      if (data) {
        console.info(data);
        this.userList = data.list;
        this.total = data.total;
        //console.info(data);
        this.pageIndex = this.userList.pageIndex;
        this.pages = this.util.setPage(data.pageSize, data.total, this.pageIndex);
      }
    });
  }
  // 显示添加用户modal
  showUserModal() {
    window['$'](".modal-add-user").modal('show');
  }

  // 添加用户
  addUser() {
    this.listService.add(this.userInfo).subscribe((data)=>{
      if(data){
        window['swal']('提示', '添加成功', 'success');
        window['$'](".modal-add-user").modal('hide');
        this.loadlist();
      }
    })
  }
  // 删除用户
  delUser(item) {
    let that = this;
    let postbody = {
      user_id: item.user_id
    }

    window['swal']({
      title: "提示",
      text: "请确认是否删除" + item.user_name + '?',
      icon: "warning",
      dangerMode: true,
      buttons: ["取消", "确定"],
    })
      .then((willDelete) => {
        if (willDelete) {
          that.listService.del(postbody).subscribe((data) => {
            if (data) {
              window['swal']('提示', '删除成功', 'success');
              that.loadlist();
            }
            else {
              window['swal']('提示', '删除失败', 'error');
            }

          });
        } else {
          // window['swal']("Your imaginary file is safe!");
        }
      });

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
