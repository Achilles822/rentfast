import { Injectable } from '@angular/core';
import { HttpClientService } from '../../../services/http-client.service';

@Injectable()
export class ListService {

  constructor(
    public httpClient: HttpClientService
  ) { }

  // 用户列表
  list(postBody) {
    return this.httpClient.post('/api/v1/users/list',postBody);
  }
  // 删除用户
  del(postbody){
    return this.httpClient.post('/api/v1/users/base/admin/del',postbody);
  }

  // 添加用户
  add(postbody){
    return this.httpClient.post('/api/v1/users/register',postbody);
  }
}
