import { RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { ProductListComponent } from './product-list/product-list.component';
import { ProductDetailsComponent } from './product-details/product-details.component';
import { ConvertsToSpacePipe } from '../shared/converts-to-space.pipe';
import { ProductDetailsGuard } from '../products/product-details/product-details.guard';
import { SharedModule } from '../shared/shared.module';
import { ProductComponent } from './product/product.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    ProductListComponent,
    ProductDetailsComponent,
    ConvertsToSpacePipe,
    ProductComponent
  ],
  imports: [
    RouterModule.forChild([
        {path: 'products/new', component: ProductComponent},
        {path: 'products', component: ProductListComponent},
        {path: 'products/:id',
        canActivate: [ProductDetailsGuard],
        component: ProductDetailsComponent},
    ]),
    SharedModule,
    FormsModule,
    ReactiveFormsModule,
  ]
})
export class ProductModule { }
