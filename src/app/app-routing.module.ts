import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LayoutComponent } from './pages/global/layout/layout.component';

import { AuthGuardService } from './services/auth-guard.service';


const routes: Routes = [
  {
    path: '',
    loadChildren: './pages/index/index.module#IndexModule'
    // loadChildren: './pages/login/login.module#LoginModule'
  },
  {
    path: 'login',
    loadChildren: './pages/login/login.module#LoginModule'
  },
  {
    path: 'products',
    loadChildren: './pages/products/products.module#ProductsModule'
  },
  {
    path: 'houses',
    loadChildren: './pages/detail/detail.module#DetailModule'
  },
  {
    path: 'pages',
    component: LayoutComponent,
    canActivate: [AuthGuardService],
    children: [
      {
        path: 'products',
        loadChildren: './pages/products/products.module#ProductsModule'
      },
      {
        path: 'accounts',
        loadChildren: './pages/account/account.module#AccountModule'
      },
      {
        path: 'needs',
        loadChildren: './pages/need/need.module#NeedModule'
      },
      {
        path: 'apply',
        loadChildren: './pages/apply/apply.module#ApplyModule'
      },

    ]
  },

  // { path: '**', component: NoFoundComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
