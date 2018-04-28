import { Injectable } from '@angular/core';
import { HttpClientService } from '../../../services/http-client.service';

@Injectable()
export class ListService {

  constructor(
    public httpClient: HttpClientService
  ) { }


  // 房源列表
  list(postBody) {
    // /api/v1/houses/list
    return this.httpClient.post('/api/v1/houses/list',postBody);
  }
  // 编辑房源
  shenHe(postBody){
    return this.httpClient.post('/api/v1/houses/base/admin/edit',postBody);
  }
  // 查看意向
  yiXiang(postbody){
    return this.httpClient.post('/api/v1/wills/list',postbody);
  }
  del(postbody){
    return this.httpClient.post('/api/v1/houses/del',postbody);
  }
  edit(postbody){
    return this.httpClient.post('/api/v1/houses/base/admin/edit',postbody);
  }
}
