import { Injectable } from '@angular/core';
import { HttpClientService } from '../../../services/http-client.service';

@Injectable()
export class RegisterService {

  constructor(
    public httpClient: HttpClientService
  ) { }
  register(postBody){
    
     return this.httpClient.post('/api/v1/users/register',postBody,{isAuthHttp:false});
   }
}
