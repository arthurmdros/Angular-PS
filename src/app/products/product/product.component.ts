import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, AbstractControl, ValidatorFn } from '@angular/forms';
import { Product } from '../product';
import { debounceTime } from 'rxjs/operators';

/*function emailMatcher(c: AbstractControl): { [key: string]: boolean} | null {
  const emailControl = c.get('email');
  const confirmControl = c.get('confirmEmail');

  if(emailControl.pristine || confirmControl.pristine){
    return null;
  }

  if(emailControl.value === confirmControl.value){
    return null;
  }

  return { 'match': true};
}*/

function ratingRange(min: number, max: number): ValidatorFn{
  return (c: AbstractControl): { [key: string]: boolean} | null => {
    if(c.value !== null && (isNaN(c.value) || c.value < min || c.value > max)){
      return{'range': true};
    }
    return null;
  }
}

@Component({
  selector: 'pm-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.css']
})
export class ProductComponent implements OnInit {
  productForm: FormGroup;
  product = new Product();
  productNameMessage: string;

  private validationMessages = {
    required: 'Informe o nome do produto.',
    minlength: 'O nome deve conter pelo menos 3 letras.',
  }

  constructor(private fb: FormBuilder) {}

  ngOnInit(){
    this.productForm = this.fb.group({
      //Id: number;
      productGroup: this.fb.group({
        productName: ['', [Validators.required, Validators.minLength(3)]],
        productCode: ['', [Validators.required, Validators.minLength(8),Validators.maxLength(8)]],
      }),
      /*
        emailGroup: this.fb.group({
          email: ['', [Validators.required, Validators.email]],
          confirmEmail: ['', [Validators.required]],
        }, {validator: emailMatcher}),
       */
      releaseDate: '',
      price: [null, [Validators.required]],
      description: '',
      starRating: [null, ratingRange(1,5)],
      imageUrl: '',
      addImageOption: 'Não'
    });

    this.productForm.get('addImageOption').valueChanges.subscribe(
      value => this.setNotification(value)
    )

    const productNameControl = this.productForm.get('productGroup.productName');
    productNameControl.valueChanges.pipe(
      debounceTime(1000)
    ).subscribe(
      value => this.setMessage(productNameControl)
    )
  }

  populateTestData(): void{
    this.productForm.patchValue({
      productName: 'Produto teste',
      productCode: 'Código teste',
      releaseDate: '10/03/2022',
      price: 0,
      description: 'Descrição teste',
      starRating: 0,
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

  setMessage(c: AbstractControl): void{
    this.productNameMessage = '';
    if((c.touched || c.dirty) && c.errors){
      this.productNameMessage = Object.keys(c.errors).map(
        key => this.validationMessages[key]).join(' ');
    }
  }

}
