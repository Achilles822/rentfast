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
  public pageIndex: any = 1;

  public pageSize: any = environment.pageSize;

  public pages: any = [];

  public pageData: any = {
    total:''
    };
  
  public userList: any;
  constructor(
    public listService: ListService,
    private util: Util
  ) { }

  ngOnInit() {
    this.loadlist();
  }

  loadlist(index?) {
    let postbody = {};
    this.listService.list({
      pageIndex: index ? index : parseInt(this.pageIndex),
      pageSize: parseInt(this.pageSize),
      where: {
       role:'user'
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
