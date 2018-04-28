import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DetailRoutingModule } from './detail-routing.module';
import { ContentComponent } from './content/content.component';
import { NgxCarouselModule } from 'ngx-carousel';
import 'hammerjs';
import { FormsModule } from "@angular/forms";
import {BypassSecurityTrustHtmlPipe} from '../../services/dom.pipe';

@NgModule({
  imports: [
    CommonModule,
    DetailRoutingModule,
    NgxCarouselModule,
    FormsModule
  ],
  declarations: [ContentComponent,BypassSecurityTrustHtmlPipe]
})
export class DetailModule { }
