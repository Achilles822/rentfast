import { Component, OnInit } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';
import * as _ from 'lodash';

@Component({
	selector: 'app-breadcrumb',
	templateUrl: './breadcrumb.component.html',
	styleUrls: ['./breadcrumb.component.css']
})
export class AppBreadcrumbComponent implements OnInit {

	list = [];
	currentItem = {
		title:""
	};
	
	constructor(
		public router: Router
	) {
		this.router.events.subscribe((evt: NavigationEnd) => {
			this.list = JSON.parse(sessionStorage.getItem('breadcrumbList'));
			this.currentItem = _.last(this.list);
		});
	}

	ngOnInit() {
	}

}
