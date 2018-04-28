import { Injectable } from '@angular/core';
import * as moment from "moment";
import * as _ from 'lodash'

@Injectable()
export class Util {
	setPage(pageSize, total, pageIndex) {
		let pages = [];
		var count = Math.ceil(total / pageSize);
		if (count <= 10) {
			pages = _.range(count);
		} else {
			var end = pageIndex + 4;
			var start = pageIndex - 5;
			if (start < 0) {
				start = 0;
				end = 10;
			}
			if (end > count) {
				end = count;
				start = count - 10;
			}
			pages = _.range(start, end);
		}
		return pages;
	};
}
