import { Injectable } from '@angular/core';
import { HttpClientService } from '../../../services/http-client.service';

@Injectable()
export class ListService {

  constructor(
    public httpClient: HttpClientService
  ) { }


  list(postbody){
    // /api/v1/users/list
    return this.httpClient.post('/api/v1/users/list',postbody);
  }
}
