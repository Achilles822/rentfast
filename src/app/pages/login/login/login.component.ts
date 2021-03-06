import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { LoginService } from './login.service';
import { HttpClientService } from '../../../services/http-client.service';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
  providers: [LoginService]
})
export class LoginComponent implements OnInit {
  public user = {
    username: "",
    password: "",
    role:"user"
  };
  constructor(
    public router: Router,
    public httpClient: HttpClientService,
    public loginService: LoginService
  ) { }

  ngOnInit() {
    window["$"]("body").addClass("login-bg");
  }
  ngAfterViewInit() {
    window['$']('input').iCheck({
      checkboxClass: 'icheckbox_square-blue',
      radioClass: 'iradio_square-blue',
      increaseArea: '20%' // optional
    });
  }
  login() {
    // console.log(this.user);
    //   this.loginService.list(this.user).subscrible(data => {
    //     console.log('------------登录打印---------' + data);
    //   })
    //   this.router.navigateByUrl("pages/products/list");
    // }
    let postBody = this.user;
    console.log(postBody);
    // this.httpClient.post('/authenticate', postBody, {
    //   isAuthHttp: false
    // }).subscribe(data => {
    //   if (data) {
    //     console.log(data);
    //       sessionStorage.setItem('token', data.token);
    //       sessionStorage.setItem('user', JSON.stringify(data.user));
    //     window['swal']('提示', '登录成功', 'success');
    //     this.router.navigateByUrl("pages/products/list");
    //   }else{
    //     console.log('登录失败');
    //   }
    // });
    this.loginService.login(postBody).subscribe(data => {
      if (data) {
        console.log(data);
        sessionStorage.setItem('token', data.token);
        sessionStorage.setItem('user', JSON.stringify(data.user));
        window['swal']('提示', '登录成功', 'success');
        if(data.user.role=='user'){
          this.router.navigateByUrl("");
        }
       else{
        this.router.navigateByUrl("pages/products/list");
       }
      } else {
        console.log('登录失败');
      }
    })
  }
}