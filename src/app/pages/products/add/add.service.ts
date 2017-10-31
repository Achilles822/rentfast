import { Injectable } from '@angular/core';
import { HttpClientService } from '../../../services/http-client.service';

@Injectable()
export class ProductAddService {

  constructor(
    public httpClient: HttpClientService
  ) { }

  list(postBody){
    // /addNewTest
    return this.httpClient.post('/api/v1/products/base/admin/add',postBody);
  }
}
