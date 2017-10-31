import { Injectable } from '@angular/core';
import { HttpClientService } from '../../../services/http-client.service';

@Injectable()
export class LoginService {

  constructor(
    public httpClient: HttpClientService
  ) { }

  login(postBody){
   
    return this.httpClient.post('/api/v1/users/login/password',postBody,{isAuthHttp:false});
  }
}
