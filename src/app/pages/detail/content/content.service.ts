import { Injectable } from '@angular/core';
import { HttpClientService } from '../../../services/http-client.service';


@Injectable()
export class ContentService {

  constructor(
    public httpClient: HttpClientService
  ) { }


  // 房源列表
  list(postBody){
    return this.httpClient.post('/api/v1/houses/list',postBody,{isAuthHttp:false});
  }

  // 保存意向
  save(postbody){
    return this.httpClient.post('/api/v1/wills/add',postbody);
  }
}
