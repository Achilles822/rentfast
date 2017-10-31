import { Component, OnInit, Input } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';

@Component({
	selector: 'app-sidebar',
	templateUrl: './sidebar.component.html',
	styleUrls: ['./sidebar.component.css']
})
export class AppSidebarComponent implements OnInit {

	@Input() public layoutMode: String = "";

	@Input() public links: Array<any> = [];

	@Input() public currentUrl: String = "";

	@Input() public nav;

	@Input() public user;

	constructor(
		public router: Router
	) {
	}

	ngOnInit() {
	}
}
