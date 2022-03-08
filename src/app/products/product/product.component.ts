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
    this.productForm = this.fb.group({
      //productId: number;
      productName: '',
      productCode: '',
      releaseDate: '',
      price: 0,
      description: '',
      //starRating: number;
      //imageUrl: string;
    });
  }

  populateTestData(): void{
    this.productForm.patchValue({
      productName: 'Produto teste',
      productCode: 'Código teste',
      releaseDate: '10/03/2022',
      price: 0,
      description: 'Descrição teste',
    })
  }

  save(){
    console.log(this.productForm);
    console.log('Saved: ' + JSON.stringify(this.productForm.value));
  }

}
