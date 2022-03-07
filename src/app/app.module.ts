import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { ProductListComponent } from './products/product-list/product-list.component';
import { ConvertsToSpacePipe } from './shared/converts-to-space.pipe';
import { StarComponent } from './shared/star.component';
import { ProductDetailsComponent } from './products/product-details/product-details.component';
import { WelcomeComponent } from './home/welcome.component';
import { RouterModule } from '@angular/router';
import { ProductDetailsGuard } from './products/product-details/product-details.guard';
import { ProductModule } from './products/product.module';

@NgModule({
  declarations: [
    AppComponent,
    ProductListComponent,
    ConvertsToSpacePipe,
    WelcomeComponent,
    StarComponent,
    ProductDetailsComponent,
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpClientModule,
    RouterModule.forRoot([
      {path: 'products', component: ProductListComponent},
      {path: 'products/:id',
      canActivate: [ProductDetailsGuard],
      component: ProductDetailsComponent},
      {path: 'welcome', component: WelcomeComponent},
      {path: '', redirectTo: 'welcome', pathMatch: 'full'},
      {path: '**', redirectTo: 'welcome', pathMatch: 'full'},
    ]),
    ProductModule
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
