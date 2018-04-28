import { Component, OnInit } from '@angular/core';
import { ListService } from './list.service';
import { environment } from '../../../../environments/environment';
import { Util } from '../../../common/util';
import { Router } from '@angular/router';
@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss'],
  providers: [ListService, Util]
})
export class ListComponent implements OnInit {

  public pageIndex: any = 1;

  public pageSize: any = environment.pageSize;

  public pages: any = [];

  public pageData: any = {
    total:''
    };

  public userList:any;

  constructor(
    private util: Util,
    public router: Router,
    public listService: ListService
  ) { }

  ngOnInit() {
    this.loadlist();
  }


  // 审核
  checkId(item){
    let postbody = {
      where:{
        user_id:item.user_id
      },
      values:{
        is_apply:0,
        role:"landlord"
      }
    }
    this.listService.update(postbody).subscribe((data)=>{
      if(data){
        window['swal']('提示', '审核成功', 'success');
        this.loadlist();
        this.router.navigateByUrl('/pages/apply/list');
      }
    })
  }

  // 加载列表
  loadlist(index?) {
    let postbody = {};
    this.listService.list({
      pageIndex: index ? index : parseInt(this.pageIndex),
      pageSize: parseInt(this.pageSize),
      where: {
       is_apply:1
      }

    }).subscribe((data) => {
      if (data) {
        console.info(data);
        this.userList = data.list;
        this.pageData = data;
        this.pageIndex = data.pageIndex;
        this.pages = this.util.setPage(data.pageSize, data.total, this.pageIndex);
      }
    });
  }
}
