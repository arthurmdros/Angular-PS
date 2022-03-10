import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { IProduct } from '../entity';
import { ProductsService } from '../../services/products.service';

@Component({
  templateUrl: './product-details.component.html',
  styleUrls: ['./product-details.component.css']
})
export class ProductDetailsComponent implements OnInit {
  pageTitle: string = 'Informações do produto';
  errorMessage = '';
  product: IProduct | undefined;

  constructor(private route: ActivatedRoute,
    private router: Router,
    private productService: ProductsService) { }

  ngOnInit(): void {
    const param =  this.route.snapshot.paramMap.get('id');
    if(param) {
      const id =+ param;
      this.getProduct(id);
    }
  }

  getProduct(id: number): void{
    this.productService.getProduct(id).subscribe({
      next: product => this.product = product,
      error: err => this.errorMessage = err
    });
  }

  onBack(): void{
    this.router.navigate(['/products']);
  }

}
