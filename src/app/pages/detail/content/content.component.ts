import { Component, OnInit } from '@angular/core';
import { ContentService } from './content.service';
import { Router, NavigationEnd, ActivatedRoute } from '@angular/router';
import { environment } from '../../../../environments/environment';
import { ViewChild, AfterViewInit } from "@angular/core";
import { NgxCarousel } from 'ngx-carousel';


// import { Swiper } from 'Swiper';
@Component({
  selector: 'app-content',
  templateUrl: './content.component.html',
  styleUrls: ['./content.component.scss'],
  providers: [ContentService]
})
export class ContentComponent implements OnInit {
  public carouselBanner: NgxCarousel;
  public carouselBannerItems: Array<any> = [];
  imgags: string[];

  public user: any = {
    username:'',
    house_rental:''
  };

  public mayLoveList:any;
  public server = environment.server;

  public houseId: any;

  public listData: any = {
  house_title:''
  };

  public photoData: any;

  public willInfo:any = {
    username:'',
    email:'',
    mobile:'',
    house_id:'',
    want_rental:''
  }
  constructor(
    public router: Router,
    private route: ActivatedRoute,
    public contentService: ContentService
  ) {

  }
  logOut(){
    sessionStorage.removeItem('user');
  }
  ngOnInit() {
    if(sessionStorage.getItem('user')!==''&&sessionStorage.getItem('user')!==null){
      this.user = JSON.parse(sessionStorage.getItem('user'));
      // console.log(this.user.house_rental)
    }else{
      this.user.username = '';
      this.user.house_rental = ''
    }
    this.loadlist();
    this.loadMayLike();
    this.imgags = [
    ];
    this.carouselBanner = {
      grid: { xs: 1, sm: 1, md: 1, lg: 1, all: 0 },
      slide: 4,
      speed: 500,
      interval: 5000,
      point: {
        visible: false,
        pointStyles: `
          .ngxcarouselPoint {
            list-style-type: none;
            text-align: center;
            padding: 12px;
            margin: 0;
            white-space: nowrap;
            overflow: auto;
            position: absolute;
            width: 100%;
            bottom: 20px;
            left: 0;
            box-sizing: border-box;
          }
          .ngxcarouselPoint li {
            display: inline-block;
            border-radius: 999px;
            background: rgba(255, 255, 255, 0.55);
            padding: 5px;
            margin: 0 3px;
            transition: .4s ease all;
          }
          .ngxcarouselPoint li.active {
              background: white;
              width: 10px;
          }
        `
      },
      load: 2,
      custom: 'banner',
      touch: true,
      loop: false,
      easing: 'cubic-bezier(0, 0, 0.2, 1)'
    };
    setTimeout(() => {
      this.carouselBannerLoad();
    }, 1000)
    // this.initImg();
  }

  public carouselBannerLoad() {
    const len = this.carouselBannerItems.length;
    if (len <= 4) {
      for (let i = len; i < len + 5; i++) {
        this.carouselBannerItems.push(
          this.imgags[Math.floor(Math.random() * this.imgags.length)]
        );
      }
    }
  }

  initImg() {
    for (var i = 0; i < this.photoData.length; i++) {
      var reg = new RegExp('"', "g");
      var newStr = this.photoData[i].photo_path.replace(reg, "");
      this.imgags.push(environment.server + '/' + newStr);
    }
  }


  loadMayLike(){
    let postbody =	{
      "where":
        {
          "house_rental": {
            "lt":this.user.house_rental
          }
        },
      "limit":2
      }

      console.log(postbody)
      this.contentService.list(postbody).subscribe((data)=>{
        console.log(data.list)
        this.mayLoveList = data.list
      })
  }

  showDetail(item) {
    let that =this;
    console.log(item.house_id)
    this.router.navigateByUrl('houses/content/' + item.house_id);
    setTimeout(function(){
      that.loadlist();
    },200)
  }
  // 获取内容详情
  loadlist() {
    this.route.params.subscribe((data) => {
      this.houseId = data.id;
      this.willInfo.house_id = data.id
    })
    let postBody = {
      where:
      {
        house_id: this.houseId
      }
    };
    this.contentService.list(postBody).subscribe((data) => {
      if (data) {
        // console.info('-----------data-------------');
        // console.info(data)
        // console.info('-----------listData-------------');
        this.listData = data.list[0];
        // console.info(this.listData);
        // console.info('-----------photo-------------');

        this.photoData = data.list[0].photos;
        // console.info(this.photoData);
        this.initImg();
      }
    })
  }
  // 显示意向模态框
  showYiXiang() {
    window['$'](".yixiang-modal").modal('show');
  }
  // 保存意向
  saveYiXiang() {
    this.contentService.save(this.willInfo).subscribe((data)=>{
      if(data){
        console.info(data);
        window['$'](".yixiang-modal").modal('hide');
        window['swal']('提示', '提交成功', 'success');
      }
    })
  }

    // 显示验证modal
    showFabu(){
      window['$'](".fabu-modal").modal('show');
    }
  
    // 跳转到验证页面
    goToTip(){
      window['$'](".fabu-modal").modal('hide');
      this.router.navigateByUrl("/tip");
    }
}
