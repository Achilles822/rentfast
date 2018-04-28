import { Injectable } from '@angular/core';
import { HttpClientService } from '../../../services/http-client.service';

@Injectable()
export class ResultService {

  constructor(
    public httpClient: HttpClientService
  ) { }

  list(postBody) {
    return this.httpClient.post('/api/v1/houses/list', postBody,{isAuthHttp:false});
  }

  // 导出excel
  excel(postbody){
    return this.httpClient.post('/api/v1/houses/excel',postbody);
  }

}
