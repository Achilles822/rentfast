import { Component, OnInit } from '@angular/core';
import { RegisterService } from './register.service';
import { Router } from '@angular/router';
@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss'],
  providers: [RegisterService]
})
export class RegisterComponent implements OnInit {
  public user = {
    username: "",
    password: "",
    confirmpassword: "",
    mobile: "",
    email: "",
    role: "user",
    house_area:"",
    house_rental:"",
    house_type:""
  };
  constructor(
    public registerService: RegisterService,
    public router: Router,
  ) { }

  ngOnInit() {
  }
  doRegister() {
    let postBody = this.user;
    /*     console.log(postBody); */
    console.info(postBody);
  if(this.user.password===this.user.confirmpassword){
    this.registerService.register(postBody).subscribe(data => {
      if (data) {
        console.log(data);
        sessionStorage.setItem('token', data.token);
        sessionStorage.setItem('user', JSON.stringify(data.user));
        window['swal']('提示', '注册成功', 'success');
        this.router.navigateByUrl("/");
      }
    })
  }
  else{
    window['swal']('提示', '两次输入密码不一致！', 'info');
  }
  }
}
