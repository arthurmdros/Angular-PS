import { AfterViewInit, Component, OnInit, OnDestroy, ViewChildren, ElementRef } from '@angular/core';
import { FormArray, FormControlName, FormGroup, FormBuilder, Validators, FormControl, NgForm } from '@angular/forms';
import { IProduct } from '../entity';
import { Subscription, Observable, fromEvent, merge } from 'rxjs';
import { GenericValidator } from '../../shared/generic-validator';
import { ActivatedRoute, Router } from '@angular/router';
import { ProductsService } from '../../services/products.service';
import { NumberValidators } from '../../shared/number.validator';
import { debounceTime } from 'rxjs/operators';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'pm-product-edit',
  templateUrl: './product-edit.component.html',
  styleUrls: ['./product-edit.component.css'],
  providers: [DatePipe]
})
export class ProductEditComponent implements OnInit, AfterViewInit, OnDestroy {

  @ViewChildren(FormControlName, {read: ElementRef}) formInputElements!: ElementRef[];

  pageTitle = 'Atualizar informações';
  errorMessage = '';
  productForm!: FormGroup;
  dateNow = new Date();
  releaseDate = '';

  product!: IProduct;
  private sub: Subscription;

  displayMessage: { [key: string]: string } = {};
  private validationMessages: { [key: string]: { [key: string]: string } };
  private genericValidator: GenericValidator;

  get tags(): FormArray {
    return this.productForm.get('tags') as FormArray;
  }

  token: string|undefined;

  public send(form: NgForm): void {
    if (form.invalid) {
      for (const control of Object.keys(form.controls)) {
        form.controls[control].markAsTouched();
      }
      return;
    }

    console.debug(`Token [${this.token}] generated`);
  }

  constructor(private fb: FormBuilder, private route: ActivatedRoute,
    private router: Router, private productService: ProductsService,
    private datePipe: DatePipe) {
      this.token = undefined;
      this.validationMessages = {
        productName: {
          required: 'Nome do produto é obrigatório.',
          minlength: 'O nome deve conter pelo menos 3 letras.',
          maxlength: 'O nome não pode exceder pelo menos 50 letras.'
        },
        productCode: {
          required: 'Código do produto é obrigatório.',
          minlength: 'O código deve conter 8 caracteres',
          maxlength: 'O código deve conter 8 caracteres'
        },
        price:{
          required: 'Preço do produto é obrigatório (Somente números)',
        },
        starRating: {
          range: 'Avaliação deve ser entre 1 (mínimo) e 5 (máximo) (Somente números)',
        }
    };

    this.genericValidator = new GenericValidator(this.validationMessages);

    this.releaseDate = this.datePipe.transform(this.dateNow, 'dd/MM/yyyy');
  }

  ngOnInit(): void {
    this.productForm = this.fb.group({
      productName: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(50)]],
      productCode: ['', [Validators.required, Validators.minLength(8), Validators.maxLength(8)]],
      price: ['', [Validators.required, Validators.pattern("^[0-9.]*$")]],
      starRating: ['', [NumberValidators.range(1,5), Validators.pattern("^[0-9.]*$")]],
      tags: this.fb.array([]),
      description: '',
      imageUrl: '',
      addImageOption: 'Não'
    });

    this.sub = this.route.paramMap.subscribe(
      params => {
        const id = Number(this.route.snapshot.paramMap.get('id'));
        this.getProduct(id);
      }
    );

    this.productForm.get('addImageOption').valueChanges.subscribe(
      value => this.setNotification(value)
    )
  }

  ngOnDestroy(): void {
    this.sub.unsubscribe();
  }

  ngAfterViewInit(): void {
    const controlBlurs: Observable<any>[] = this.formInputElements
      .map((formControl: ElementRef) => fromEvent(formControl.nativeElement, 'blur'));

    merge(this.productForm.valueChanges, ...controlBlurs).pipe(
      debounceTime(800)
    ).subscribe(value => {
      this.displayMessage = this.genericValidator.processMessages(this.productForm);
    });
  }

  getProduct(id: number): void{
    this.productService.getProduct(id)
      .subscribe({
        next: (product: IProduct) => this.displayProduct(product),
        error: err => this.errorMessage = err
      });
  }

  displayProduct(product: IProduct): void {
    if (this.productForm) {
      this.productForm.reset();
    }
    this.product = product;

    if (this.product.id === 0) {
      this.pageTitle = 'Novo produto';
    } else {
      this.pageTitle = `Atualizar informações: ${this.product.productName}`;
    }

    this.productForm.patchValue({
      productName: this.product.productName,
      productCode: this.product.productCode,
      price: this.product.price,
      starRating: this.product.starRating,
      description: this.product.description,
      imageUrl: this.product.imageUrl,
    });
    this.productForm.setControl('tags', this.fb.array(this.product.tags || []));
  }

  saveProduct(): void {
    if(this.productForm.valid){
      if(this.productForm.dirty){
        const p = { ...this.product, ...this.productForm.value };

        if(p.id === 0){
          this.productService.createProduct(p, this.releaseDate)
            .subscribe({
              next: p => {console.log(p); return this.onSaveComplete();},
              error: err => this.errorMessage = err
            });
        } else {
          this.productService.updateProduct(p)
            .subscribe({
              next: () => this.onSaveComplete(),
              error: err => this.errorMessage = err
            });
        }
      } else {
        this.onSaveComplete();
      }
    } else {
        this.errorMessage = 'Por-favor, corrija os erros exibidos!';
      }
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

  addTag(): void {
    this.tags.push(new FormControl());
  }

  deleteTag(index: number): void {
    this.tags.removeAt(index);
    this.tags.markAsDirty();
  }

  onSaveComplete(): void {
    this.productForm.reset();
    this.router.navigate(['/products']);
  }
}
