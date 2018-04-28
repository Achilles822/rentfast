import { Component, OnInit } from '@angular/core';
import { ResultService } from './result.service';
import { environment } from '../../../../environments/environment';
import { Router, ActivatedRoute } from '@angular/router';
import { Util } from '../../../common/util';


@Component({
  selector: 'app-result',
  templateUrl: './result.component.html',
  styleUrls: ['./result.component.scss'],
  providers: [ResultService, Util]
})
export class ResultComponent implements OnInit {

  public searchkey: any;


  public searchBody: any;

  // house_rental 租金
  public start_house_rental: any;
  public end_house_rental: any;
  public rentalData = [
    {
      start: 0,
      end: 600
    },
    {
      start: 600,
      end: 1000
    },
    {
      start: 1000,
      end: 1500
    },
    {
      start: 1500,
      end: 2000
    },
    {
      start: 2000,
      end: 3000
    },
    {
      start: 3000,
      end: 5000
    },
    {
      start: 5000,
      end: 8000
    },
  ]
  // house_direction 房子朝向
  public house_direction: any;

  // house_fitment  装修程度
  public fitmentData: any = [
    // 毛坯 简单装修 中等装修 精装修 豪华装修
    '毛坯', '简单装修', '中等装修', '精装修', '豪华装修'
  ];
  public fitment: any;

  // house_block 所在区
  public house_block: any;

  public blockData: any = [
    '天河', '番禺', '越秀','萝岗','从化','白云'
  ]
  // 所选区
  public block: any;
  // 朝向
  public directionData: any = [
    '东', '西', '南', '北', '东南', '西南', '东北', '西北', '南北', '东西'
  ];
  public direction: any;

  // 厅室
  public roomData: any = [
    {
      "list": '一室',
      "data": "1"
    },
    {
      "list": '二室',
      "data": "2"
    },
    {
      "list": '三室',
      "data": "3"
    },
    {
      "list": '四室',
      "data": "4"
    }
  ];

  public room: any;

  public pageData: any = {
    total: ''
  };

  public pageIndex: any = 1;

  public pageSize: any = environment.pageSize;

  public pages: any = [];

  public user: any = {
    username: ''
  };

  constructor(
    public router: Router,
    private route: ActivatedRoute,
    public resultService: ResultService,
    private util: Util
  ) {
    this.route.params.subscribe((data) => {
      this.searchkey = data.key;
    })
  }

  public listData: any;
  public server = environment.server;
  ngOnInit() {
    if (sessionStorage.getItem('user') !== '' && sessionStorage.getItem('user') !== null) {
      this.user = JSON.parse(sessionStorage.getItem('user'));
    } else {
      this.user.username = '';
    }
    this.loadlist();
  }
  // 传值给详情页面
  showDetail(item) {
    this.router.navigateByUrl('houses/content/' + item.house_id);
  }

  logOut() {
    sessionStorage.removeItem('user');
  }

  // 显示验证modal
  showFabu() {
    window['$'](".fabu-modal").modal('show');
  }

  // 跳转到验证页面
  goToTip() {
    window['$'](".fabu-modal").modal('hide');
    this.router.navigateByUrl("/tip");
  }
  // 导出报表
  exportExcel() {
    this.resultService.excel(this.searchBody).subscribe((data) => {
      console.info(data);
      const iframe = window['$']("<iframe id='downloadiframe'>");
      iframe.attr('style', 'display:none');
      iframe.attr('src', environment.server + '/' + data);
      window['$']('body').append(iframe);
      setTimeout("$('#downloadiframe').remove()", 5000);
    })
  }
  loadlist() {
    let postBody: any = {
      "where": {
        "house_is_check": "1"
      }
    };
    postBody.where.house_title = {
      "$like": "%" + this.searchkey + "%"
    };
    if (this.start_house_rental !== undefined && this.start_house_rental !== null) {
      postBody.where.house_rental = {
        "$gte": this.start_house_rental,
        "$lte": this.end_house_rental
      };
    }
    if (this.room !== undefined && this.room !== null) {
      postBody.where.house_room = this.room;
    }
    if (this.direction !== undefined && this.direction !== null) {
      postBody.where.house_direction = this.direction

    }
    if (this.block !== undefined && this.block !== null) {
      postBody.where.house_block = this.block

    }
    this.searchBody = postBody;
    this.resultService.list(postBody).subscribe((data) => {
      console.info(postBody)
      // console.info(data);
      this.pageData = data;
      this.listData = data.list;
      this.pages = this.util.setPage(data.pageSize, data.total, this.pageIndex);
    })
  }

  // 拼凑搜索条件
  searchConditions(startRental, endRental, direction, fitment, block, room) {
    this.start_house_rental = startRental;
    this.end_house_rental = endRental;
    this.block = block;
    this.direction = direction;
    this.fitment = fitment;
    this.room = room;
    // console.info(this.start_house_rental);
    // console.info(this.end_house_rental);
    // console.info(this.block);
    // console.info(this.fitment);
    // console.info(this.room)
    // console.info(this.direction);
    this.loadlist();
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
