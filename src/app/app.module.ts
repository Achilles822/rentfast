import { BrowserModule } from '@angular/platform-browser';
import { NgModule,Directive } from '@angular/core';
import { FormsModule } from '@angular/forms';

import { AppComponent } from './app.component';
import { AppSidebarComponent } from './widgets/sidebar/sidebar.component';
import { LayoutComponent } from './pages/global/layout/layout.component';
import { AppRoutingModule } from './app-routing.module';

import { AuthGuardService } from './services/auth-guard.service';

import { HttpModule, Http, RequestOptions } from '@angular/http';
import { AuthHttp, AuthConfig } from 'angular2-jwt';
import { AppHeaderComponent } from './widgets/header/header.component';
import { AppFooterComponent } from './widgets/footer/footer.component';
import { AppBreadcrumbComponent } from './widgets/breadcrumb/breadcrumb.component';
import { HttpClientService } from './services/http-client.service';
import { QuillModule } from 'ngx-quill';
// import {KSSwiperModule} from "angular2-swiper";
import { NgxCarouselModule } from 'ngx-carousel';
import 'hammerjs';

// import {BypassSecurityTrustHtmlPipe} from './services/dom.pipe';
// import { FileSelectDirective, FileDropDirective, FileUploader } from 'ng2-file-upload/ng2-file-upload';
/**
 * [authHttpServiceFactory 定义存储token的位置和名称]
 * @param {Http}           http    [description]
 * @param {RequestOptions} options [description]
 */

export function authHttpServiceFactory(http: Http, options: RequestOptions) {
  return new AuthHttp(new AuthConfig({
    tokenName: 'token',
    tokenGetter: (() => sessionStorage.getItem('token')),
    globalHeaders: [{ 'Content-Type': 'application/json' }],
  }), http, options);
}
// @Directive({
//   declarations: [
//     FileUploader,
//     FileSelectDirective,
//     FileDropDirective
//   ]
// })
@NgModule({
  declarations: [
    AppComponent,
    LayoutComponent,
    AppSidebarComponent,
    AppHeaderComponent,
    AppFooterComponent,
    AppBreadcrumbComponent,
    

  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpModule,
    QuillModule,
    NgxCarouselModule
  ],
  providers: [{
    provide: AuthHttp,
    useFactory: authHttpServiceFactory,
    deps: [Http, RequestOptions]
  }, AuthGuardService,HttpClientService],
  bootstrap: [AppComponent]
})
export class AppModule { }
