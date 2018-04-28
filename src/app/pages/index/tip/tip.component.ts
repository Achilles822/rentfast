import { Component, OnInit } from '@angular/core';
import {TipService} from './tip.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-tip',
  templateUrl: './tip.component.html',
  styleUrls: ['./tip.component.scss'],
  providers:[TipService]
})
export class TipComponent implements OnInit {

  // 身份信息
  public user:any = {
    realname:'',
    personId:''
  }

public userId:any;
  constructor(
    public tipService:TipService,
    public router: Router
  ) { }

  ngOnInit() {
    this.userId  = JSON.parse(sessionStorage.getItem('user')).id;
    console.log(this.userId);
  }

  // 提交身份验证信息
  submitCheckId(){
    let postbody ={
      where:{
        user_id:this.userId
      },
      values:{
        is_apply:1,
        person_id:this.user.personId,
        person_realname:this.user.realname
      }
    }
    this.tipService.update(postbody).subscribe((data)=>{
      console.log(postbody);
      if(data){
        window['swal']('提示', '提交成功', 'success');
        this.router.navigateByUrl("/");
      }else{
        window['swal']('提示', '提交失败', 'error');
      }
    })
  }


}
