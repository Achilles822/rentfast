import { Injectable } from '@angular/core';
import { Http, Headers } from '@angular/http';
import { AuthHttp, AuthConfig } from 'angular2-jwt';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/toPromise';
import 'rxjs/add/operator/timeout';
import 'rxjs/add/operator/finally';
import 'rxjs/add/observable/throw';
import { Observable } from 'rxjs/Rx';
import { environment } from '../../environments/environment';
import * as _ from 'lodash'

interface HttpClientConifg {
	isShowLoading?: boolean;
	isAlterError?: boolean;
	isAuthHttp?: boolean;
	loadingText?: string;
	isReturnOriginal?: boolean;
}

@Injectable()
export class HttpClientService {

	constructor(
		public authHttp: AuthHttp,
		public http: Http,
	) { }

	_handler(type, url, reqBody?, postConfig?) {
		let serverUrl;
		if (_.startsWith(url, "http://") || _.startsWith(url, "https://")) {
			serverUrl = new window['URI'](url)
		} else {
			serverUrl = new window['URI'](environment.server + url)
		}
		let requestOptions: any = {

		};

		// 初始化配置
		let defaultPostConfig = {
			isShowLoading: true,
			isAuthHttp: true,
			isAlterError: true,
			isReturnOriginal: false,
			loadingText: environment.loadingText
		}
		// 覆盖配置文件
		let _postConfig = _.assignIn(defaultPostConfig, postConfig);

		// 定义连接
		let _httpClient: any;

		if (_postConfig.isAuthHttp) {
			_httpClient = this.authHttp;
		} else {
			_httpClient = this.http;
		}

		let reqUrl, __httpClient;

		if (type === 'get' || type === 'delete') {
			serverUrl.search(reqBody);
			// 置空header
			reqUrl = serverUrl.toString();
			__httpClient = _httpClient[type](reqUrl, requestOptions);
		} else {
			reqUrl = serverUrl.toString();
			__httpClient = _httpClient[type](reqUrl, reqBody, requestOptions);
		}

		console.log('-----------请求地址------------');
		console.log(reqUrl);
		console.log('-----------请求方式------------');
		console.log(type);
		console.log('-----------请求参数------------');
		console.log(reqBody);
		return __httpClient.timeout(environment.timeout).map(res => {
			let result = res.json();
			if (_postConfig.isReturnOriginal) {
				return result;
			} else {
				if (result.isSuccess) {
					return result.data ? result.data : "success";
				} else {
					window['swal']("提示", result.msg, "error");
					return null;
				}
			}
		}).catch(err => {
			console.log('---------------------http err---------------------');
			console.log(err);
			var body = JSON.parse(err._body);
			let tips;
			if (err.status == 0) {
				tips = '网络连接出错,请检查网络状态';
			} else if (err.status == 401) {
				tips = '登录过期,请重新登录';
			} else if (err.status == 404) {
				tips = '访问接口不存在,请检查后重试';
			} else if (err.status == 500) {
				tips = body.error;
			} else {
				tips = '系统发生一个错误,请稍后重试!';
			}
			if (_postConfig.isAlterError) {
				window['swal']("提示", tips, "error");
			}
			return Observable.of(null);
		}).finally(() => {
			if (_postConfig.isShowLoading) {

			}
			console.log('---------------------http finally---------------------');
		});
	}

	post(url, reqBody?, postConfig?: HttpClientConifg) {
		return this._handler('post', url, reqBody, postConfig);
	}

	put(url, reqBody?, postConfig?: HttpClientConifg) {
		return this._handler('put', url, reqBody, postConfig);
	}

	delete(url, reqBody?, postConfig?: HttpClientConifg) {
		return this._handler('delete', url, reqBody, postConfig);
	}

	get(url, reqBody?, postConfig?: HttpClientConifg) {
		return this._handler('get', url, reqBody, postConfig);
	}

}
