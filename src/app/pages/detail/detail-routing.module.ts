import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ContentComponent } from './content/content.component';
const routes: Routes = [
  {
    path: 'content/:id',
    component: ContentComponent
  }
  // {
  //   path: 'result',
  //   component: ResultComponent
  // }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DetailRoutingModule { }
