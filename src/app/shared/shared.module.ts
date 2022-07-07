import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { SwiperModule } from "swiper/angular";

import { PaginatorComponent } from './paginator/paginator.component';
import { PdfGeneratorComponent } from './pdf-generator/pdf-generator.component';
import { SliderComponent } from './slider/slider.component';
import { StarComponent } from './star/star.component';

@NgModule({
  declarations: [
    StarComponent,
    PdfGeneratorComponent,
    PaginatorComponent,
    SliderComponent
  ],
  imports: [
    CommonModule,
    MatIconModule,
    MatButtonModule,
    SwiperModule
  ],
  exports: [
    StarComponent,
    CommonModule,
    FormsModule,
    SliderComponent,
    PaginatorComponent,
    MatButtonModule,
    MatIconModule
  ]
})
export class SharedModule { }
