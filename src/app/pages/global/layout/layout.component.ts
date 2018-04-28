import { Component, OnInit } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';
import { environment } from '../../../../environments/environment';
import * as _ from 'lodash';

@Component({
  selector: 'app-layout',
  templateUrl: './layout.component.html',
  styleUrls: ['./layout.component.css']
})
export class LayoutComponent implements OnInit {

  public sidebarLinks: Array<any> = [];

  public currentUrl: string = "";

  public user: any = {};

  // sidebar  or   topnav
  public layoutMode: String = environment.layout;

  constructor(public router: Router) {
    this.user = JSON.parse(sessionStorage.getItem('user'));
    if (this.user.role == 'admin') {
      this.sidebarLinks = [
        {
          'title': '房源管理',
          'icon': 'area-chart',
          'link': ['/pages/products/list']
        },
        {
          'title': '账户管理',
          'icon': 'calendar-minus-o',
          'link': ['/pages/accounts/list']
        },
        {
          'title': '用户需求查看',
          'icon': 'calendar-minus-o',
          'link': ['/pages/needs/list']
        },
        {
          'title': '房东权限申请',
          'icon': 'calendar-minus-o',
          'link': ['/pages/apply/list']
        }
      ];
    } else if (this.user.role == 'landlord') {
      this.sidebarLinks = [
        {
          'title': '房源管理',
          'icon': 'area-chart',
          'link': ['/pages/products/list']
        }
      ];
    }
    this.router.events.subscribe((evt: NavigationEnd) => {
      this.currentUrl = evt.url;
    });
    if (this.layoutMode == 'topnav') {
      window["$"]("body").removeClass();
      window["$"]("body").addClass("hold-transition skin-blue layout-top-nav login-page");
    }
  }

  nav(item, subItem) {
    var currentItem = item;
    if (subItem) {
      currentItem = subItem;
    }
    if (!currentItem.sublinks) {
      if (currentItem.external) {
        if (currentItem.target == '_blank') {
          window.open(currentItem.link);
        } else {
          window.location.href = currentItem.link;
        }
        // 打开新连接
      } else {
        this.router.navigate(currentItem.link);
        var breadcrumbList = _.without([item, subItem], null);
        sessionStorage.setItem('breadcrumbList', JSON.stringify(breadcrumbList));
      }
    }
  }

  ngOnInit() {
    // 解决footer浮动问题
    window['$'](window).resize();
    // var demo = {
    // 	'title': 'External Link',
    // 	'icon': 'google',
    // 	'link': ['http://google.com'],
    // 	'external': true,
    // 	'target': '_blank'
    // }

  }
}
