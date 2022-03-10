import { AfterViewInit, Component, OnInit, OnDestroy, ViewChildren, ElementRef } from '@angular/core';
import { FormArray, FormControlName, FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import { IProduct } from '../entity';
import { Subscription, Observable, fromEvent, merge } from 'rxjs';
import { GenericValidator } from '../../shared/generic-validator';
import { ActivatedRoute, Router } from '@angular/router';
import { ProductsService } from '../../services/products.service';
import { NumberValidators } from '../../shared/number.validator';
import { debounceTime } from 'rxjs/operators';

@Component({
  selector: 'pm-product-edit',
  templateUrl: './product-edit.component.html',
  styleUrls: ['./product-edit.component.css']
})
export class ProductEditComponent implements OnInit, AfterViewInit, OnDestroy {

  @ViewChildren(FormControlName, {read: ElementRef}) formInputElements!: ElementRef[];

  pageTitle = 'Atualizar informações';
  errorMessage = '';
  productForm!: FormGroup;

  product!: IProduct;
  private sub: Subscription;

  displayMessage: { [key: string]: string } = {};
  private validationMessages: { [key: string]: { [key: string]: string } };
  private genericValidator: GenericValidator;

  get tags(): FormArray {
    return this.productForm.get('tags') as FormArray;
  }

  constructor(private fb: FormBuilder, private route: ActivatedRoute,
    private router: Router, private productService: ProductsService) {
      this.validationMessages = {
        productName: {
          required: 'Nome do produto é obrigatório.',
          minlength: 'O nome deve conter pelo menos 3 letras.',
          maxlength: 'O nome não pode exceder pelo menos 50 letras.'
        },
        productCode: {
          required: 'Código do produto é obrigatório.'
        },
        starRating: {
          range: 'Avaliação deve ser entre 1 (mínimo) e 5 (máximo).'
        }
    };

    this.genericValidator = new GenericValidator(this.validationMessages);
  }

  ngOnInit(): void {
    this.productForm = this.fb.group({
      productName: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(50)]],
      productCode: ['', Validators.required],
      starRating: ['', NumberValidators.range(1, 5)],
      tags: this.fb.array([]),
      description: ''
    });

    this.sub = this.route.paramMap.subscribe(
      params => {
        const id = Number(this.route.snapshot.paramMap.get('id'));
        this.getProduct(id);
      }
    );
  }

  ngOnDestroy(): void {
    this.sub.unsubscribe();
  }

  ngAfterViewInit(): void {
    const controlBlurs: Observable<any>[] = this.formInputElements
      .map((formControl: ElementRef) => fromEvent(formControl.nativeElement, 'blur'));

    merge(this.productForm.valueChanges, ...controlBlurs).pipe(
      debounceTime(1000)
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
      starRating: this.product.starRating,
      description: this.product.description
    });
    this.productForm.setControl('tags', this.fb.array(this.product.tags || []));
  }

  saveProduct(): void {
    console.log("Salvar produto")
  }


  deleteProduct(): void {
    console.log("Remover produto")
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
