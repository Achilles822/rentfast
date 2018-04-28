import { Component, OnInit, Input, ViewChild } from '@angular/core';
import { environment } from '../../../environments/environment';
import { Router, NavigationEnd } from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class AppHeaderComponent implements OnInit {
  @Input() public layoutMode: String = "";

  @Input() public links: Array<any> = [];

  @Input() public currentUrl: String = "";

  @Input() public nav;

  @Input() public user;

  public server: String = environment.server;

  constructor(public router: Router) { }

  ngOnInit() {
  }
  logout(){
    sessionStorage.removeItem('user');
    this.router.navigateByUrl('/');
    
  }
}
