import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, FormBuilder, Validators } from '@angular/forms';
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
      productName: ['', [Validators.required, Validators.minLength(3)]],
      productCode: ['', [Validators.required, Validators.minLength(8),Validators.maxLength(8)]],
      releaseDate: '',
      price: [0, [Validators.required]],
      description: '',
      //starRating: number;
      imageUrl: '',
      addImageOption: 'Não'
    });
  }

  populateTestData(): void{
    this.productForm.patchValue({
      productName: 'Produto teste',
      productCode: 'Código teste',
      releaseDate: '10/03/2022',
      price: 0,
      description: 'Descrição teste',
      imageUrl: 'Url teste',
    })
  }

  setNotification(notifyVia: string): void{
    const imageUrlControl = this.productForm.get('imageUrl');
    if(notifyVia === 'Sim'){
      imageUrlControl.setValidators(Validators.required);
    }else{
      imageUrlControl.clearValidators();
    }
    imageUrlControl.updateValueAndValidity();
  }

  save(){
    console.log(this.productForm);
    console.log('Saved: ' + JSON.stringify(this.productForm.value));
  }

}
