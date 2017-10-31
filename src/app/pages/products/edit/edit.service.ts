import { Injectable } from '@angular/core';
import { HttpClientService } from '../../../services/http-client.service';

@Injectable()
export class ProductEditService {

  constructor(
    public httpClient: HttpClientService) { 
  }
// 
  list(postBody){
    // /addNewTest
    return this.httpClient.post('/addNewTest',postBody);
  }
}
