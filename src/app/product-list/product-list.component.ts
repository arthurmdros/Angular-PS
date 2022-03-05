import { Component, OnInit } from '@angular/core';
import { ProductsService } from '../services/products.service';
import { IProduct } from './product';

@Component({
  selector: 'pm-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.css']
})
export class ProductListComponent implements OnInit {

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

  constructor(private productService:ProductsService) { }

  ngOnInit(): void {
    this.products = this.productService.getProducts();
    this.filteredProducts = this.products;
  }

  onRatingClicked(message:string): void{
    this.pageTitle = 'Lista de produtos: ' + message;
  }
}
