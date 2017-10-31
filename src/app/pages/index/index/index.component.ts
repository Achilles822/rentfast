import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-index',
  templateUrl: './index.component.html',
  styleUrls: ['./index.component.scss']
})
export class IndexComponent implements OnInit {

  constructor(
    public router: Router
  ) { }

  ngOnInit() {
  }

  // 显示搜索结果
  showResult(){
    this.router.navigateByUrl("result");
  }
}
