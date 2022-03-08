import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Product } from '../product';

@Component({
  selector: 'pm-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.css']
})
export class ProductComponent implements OnInit {
  product = new Product();

  constructor() { }

  ngOnInit(): void {
  }

  save(productForm: NgForm): void {
    console.log(productForm.form);
    console.log('Saved: ' + JSON.stringify(productForm.value));
  }

}
