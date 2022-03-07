import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProductListComponent } from './product-list/product-list.component';
import { ProductDetailsComponent } from './product-details/product-details.component';
import { StarComponent } from '../shared/star.component';
import { ConvertsToSpacePipe } from '../shared/converts-to-space.pipe';
import { ProductDetailsGuard } from '../products/product-details/product-details.guard';

@NgModule({
  declarations: [
    ProductListComponent,
    ProductDetailsComponent,
    StarComponent,
    ConvertsToSpacePipe
  ],
  imports: [
    CommonModule,
    FormsModule,
    RouterModule.forChild([
        {path: 'products', component: ProductListComponent},
        {path: 'products/:id',
        canActivate: [ProductDetailsGuard],
        component: ProductDetailsComponent},
    ])
  ]
})
export class ProductModule { }
