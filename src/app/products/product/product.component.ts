import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, FormBuilder } from '@angular/forms';
import { Product } from '../product';

@Component({
  selector: 'pm-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.css']
})
export class ProductComponent implements OnInit {
  productForm: FormGroup;
  product = new Product();

  constructor(private fb: FormBuilder) {}

  ngOnInit(){
    this.productForm = new FormGroup({
      //productId: number;
      productName: new FormControl(),
      productCode: new FormControl(),
      releaseDate: new FormControl(),
      price: new FormControl(),
      description: new FormControl(),
      //starRating: number;
      //imageUrl: string;
    });
  }

  save(){
    console.log(this.productForm);
    console.log('Saved: ' + JSON.stringify(this.productForm.value));
  }

}
