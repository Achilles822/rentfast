import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-index',
  templateUrl: './index.component.html',
  styleUrls: ['./index.component.scss']
})
export class IndexComponent implements OnInit {

  public user: any = {
    username:''
  };

  public searchkey: any = '';

  constructor(
    public router: Router
  ) {}

  ngOnInit() {
    console.log(sessionStorage.getItem('user'));
    
    if(sessionStorage.getItem('user')!==''&&sessionStorage.getItem('user')!==null){
      this.user = JSON.parse(sessionStorage.getItem('user'));
    }else{
      this.user.username = '';
    }
  }
  logOut(){
    sessionStorage.removeItem('user');
  }
  // 显示搜索结果
  showResult() {
    this.router.navigateByUrl("result/" + this.searchkey);
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
