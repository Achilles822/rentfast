import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { IndexComponent } from './index/index.component';
import { ResultComponent } from './result/result.component';
import { LoginComponent } from '../login/login/login.component';
import { TipComponent } from './tip/tip.component';
const routes: Routes = [
  {
    path: '',
    component: IndexComponent
  },
  {
    path: 'result/:key',
    component: ResultComponent
  },
  {
    path: 'tip',
    component: TipComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class IndexRoutingModule { }
