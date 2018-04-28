import { Injectable } from '@angular/core';
import { HttpClientService } from '../../../services/http-client.service';

@Injectable()
export class ProductAddService {

  constructor(
    public httpClient: HttpClientService
  ) { }

  // 添加房源
  add(postBody,options){
    return this.httpClient.post('/api/v1/houses/add',postBody,options);
  }

  // 编辑房源
  edit(postbody){
    return this.httpClient.post('/api/v1/houses/base/admin/edit',postbody);
  }

  // 获取信息
  list(postbody){
    return this.httpClient.post('/api/v1/houses/list',postbody);
  }
}
