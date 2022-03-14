import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';

import { PaginatorComponent } from './paginator/paginator.component';
import { PdfGeneratorComponent } from './pdf-generator/pdf-generator.component';
import { StarComponent } from './star/star.component';

@NgModule({
  declarations: [
    StarComponent,
    PdfGeneratorComponent,
    PaginatorComponent
  ],
  imports: [
    CommonModule,
    MatIconModule,
    MatButtonModule
  ],
  exports: [
    StarComponent,
    CommonModule,
    FormsModule,
    PaginatorComponent,
    MatButtonModule,
    MatIconModule
  ]
})
export class SharedModule { }
