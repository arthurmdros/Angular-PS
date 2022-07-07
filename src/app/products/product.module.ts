import { RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { ProductListComponent } from './product-list/product-list.component';
import { ProductDetailsComponent } from './product-details/product-details.component';
import { ConvertsToSpacePipe } from '../shared/converts-to-space.pipe';
import { ProductDetailsGuard } from '../products/product-details/product-details.guard';
import { SharedModule } from '../shared/shared.module';
import { ProductComponent } from './product/product.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { InMemoryWebApiModule } from 'angular-in-memory-web-api';
import { Product } from './product';
import { ProductEditComponent } from './product-edit/product-edit.component';
import { PdfGeneratorComponent } from '../shared/pdf-generator/pdf-generator.component';
import { RecaptchaFormsModule, RecaptchaModule, RecaptchaSettings, RECAPTCHA_LANGUAGE, RECAPTCHA_SETTINGS } from 'ng-recaptcha';
import { environment } from '../../environments/environment.prod';
import { LOCALE_ID } from "@angular/core";
@NgModule({
  declarations: [
    ProductListComponent,
    ProductDetailsComponent,
    ConvertsToSpacePipe,
    ProductComponent,
    ProductEditComponent
  ],
  imports: [
    RouterModule.forChild([
        //{path: 'products/new', component: ProductComponent},
        {path: 'products/pdf', component: PdfGeneratorComponent},
        {path: 'products', component: ProductListComponent},
        {path: 'products/:id/edit', component: ProductEditComponent}, //:id
        {path: 'products/:id',
        canActivate: [ProductDetailsGuard],
        component: ProductDetailsComponent},
    ]),
    SharedModule,
    FormsModule,
    ReactiveFormsModule,
    RecaptchaModule,
    RecaptchaFormsModule,
    InMemoryWebApiModule.forRoot(Product)
  ],
    providers:[
      {
        provide: RECAPTCHA_SETTINGS,
        useValue: {
          siteKey: environment.recaptcha.siteKey,
        } as RecaptchaSettings,
      },
      {
        provide: RECAPTCHA_LANGUAGE,
        useValue: "pt-Br", // use French language
      },
    ]
})
export class ProductModule { }
