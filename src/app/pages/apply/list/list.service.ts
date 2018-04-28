import { Injectable } from '@angular/core';
import { HttpClientService } from '../../../services/http-client.service';

@Injectable()
export class ListService {

  constructor(
    public httpClient: HttpClientService    
  ) { }


  // 提交身份信息
  update(postbody){
    return this.httpClient.post('/api/v1/users/edit',postbody);
  }
  list(postbody){
  return this.httpClient.post('/api/v1/users/list',postbody);
  }
}
