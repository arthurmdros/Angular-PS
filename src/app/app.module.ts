import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { ProductListComponent } from './product-list/product-list.component';
import { ConvertsToSpacePipe } from './shared/converts-to-space.pipe';
import { StarComponent } from './shared/star.component';
import { ProductDetailsComponent } from './product-details/product-details.component';
import { WelcomeComponent } from './home/welcome.component';
import { RouterModule } from '@angular/router';
import { ProductDetailsGuard } from './product-details/product-details.guard';

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
    ])
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
