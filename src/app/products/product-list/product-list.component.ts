import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';

import { ProductsService } from '../../services/products.service';
import { IProduct } from '../entity';

@Component({
  selector: 'pm-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.css']
})
export class ProductListComponent implements OnInit, OnDestroy {

  sub!: Subscription;
  errorMessage: string = '';
  imageWidth = 50;
  imageMargin : number = 2;
  showImage: boolean = false;
  private _listFilter: string = '';
  get listFilter():string {
    return this._listFilter;
  }
  set listFilter(value : string){
    this._listFilter = value;
    this.filteredProducts = this.performFilter(value);
  }
  filteredProducts: IProduct[] = [];

  pageTitle: string = 'Lista de produtos';
  products: IProduct[] = [];

  toggleImage():void{
    this.showImage = !this.showImage;
  }

  performFilter(filterBY: string): IProduct[] {
    filterBY = filterBY.toLocaleLowerCase();
    return this.products.filter((product: IProduct) =>
      product.productName.toLocaleLowerCase().includes(filterBY));
  }

    performFilter2(filterBy: string): IProduct[] {
      filterBy = filterBy.toLocaleLowerCase();
      return this.products.filter((product: IProduct) =>
        product.productName.toLocaleLowerCase().indexOf(filterBy) !== -1 ||
          (product.tags && product.tags.some(tag => tag.toLocaleLowerCase().indexOf(filterBy) !== -1)));
    }

  constructor(private productService:ProductsService) { }

  ngOnDestroy(): void {
    this.sub.unsubscribe();
  }

  ngOnInit(): void {
    this.sub = this.productService.getProducts().subscribe({
      next: products => {
        this.products = products;
        this.filteredProducts = this.products;
      },
      error: err => this.errorMessage = err
    });
  }

  onRatingClicked(message:string): void{
    this.pageTitle = 'Lista de produtos: ' + message;
  }


  deleteProduct(product: IProduct): void {
    if(confirm(`Deseja deletar o produto: ${product.productName} ?`)){
      this.productService.deleteProduct(product.id)
        .subscribe({
          next: () => this.ngOnInit(),
          error: err => this.errorMessage = err
        })
      }
    }

  changeStatus(product: IProduct): void{
    if(confirm(`Deseja deletar o produto: ${product.productName} ?`)){
    this.productService.changeStatus(product)
      .subscribe({
        next: () => this.ngOnInit(),
        error: err => this.errorMessage = err
      });
    }
  }
}
