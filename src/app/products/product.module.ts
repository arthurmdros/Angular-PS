import { RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { ProductListComponent } from './product-list/product-list.component';
import { ProductDetailsComponent } from './product-details/product-details.component';
import { ConvertsToSpacePipe } from '../shared/converts-to-space.pipe';
import { ProductDetailsGuard } from '../products/product-details/product-details.guard';
import { SharedModule } from '../shared/shared.module';

@NgModule({
  declarations: [
    ProductListComponent,
    ProductDetailsComponent,
    ConvertsToSpacePipe
  ],
  imports: [
    RouterModule.forChild([
        {path: 'products', component: ProductListComponent},
        {path: 'products/:id',
        canActivate: [ProductDetailsGuard],
        component: ProductDetailsComponent},
    ]),
    SharedModule
  ]
})
export class ProductModule { }
