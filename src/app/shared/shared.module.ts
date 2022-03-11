import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StarComponent } from './star.component';
import { FormsModule } from '@angular/forms';
import { PdfGeneratorComponent } from './pdf-generator/pdf-generator.component';
import { PaginatorComponent } from './paginator/paginator.component';
import {MatIconModule} from '@angular/material/icon';
import {MatButtonModule} from '@angular/material/button';

@NgModule({
  declarations: [
    StarComponent,
    PdfGeneratorComponent,
    PaginatorComponent,
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
    PaginatorComponent
  ]
})
export class SharedModule { }
