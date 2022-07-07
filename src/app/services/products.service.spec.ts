import { HttpClientTestingModule, HttpTestingController, TestRequest } from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';

import { IProduct } from '../products/entity';
import { ProductsService } from './products.service';

fdescribe('ProductsService Tests', () => {
  let productService: ProductsService;
  let httpTestingController: HttpTestingController

  let testProducts: IProduct[] = [
    {
      id: 1,
      productName: 'Leaf Rake',
      productCode: 'GDN-0011',
      releaseDate: 'March 19, 2018',
      description: 'Leaf rake with 48-inch wooden handle',
      price: 19.95,
      starRating: 3.2,
      imageUrl: 'assets/images/leaf_rake.png',
      tags: ['rake', 'leaf', 'yard', 'home'],
      isActive: true,
    },
    {
      id: 2,
      productName: 'Garden Cart',
      productCode: 'GDN-0023',
      releaseDate: 'March 18, 2018',
      description: '15 gallon capacity rolling garden cart',
      price: 32.99,
      starRating: 4.2,
      imageUrl: 'assets/images/garden_cart.png',
      isActive: true,
    },
    {
      id: 5,
      productName: 'Hammer',
      productCode: 'TBX-0048',
      releaseDate: 'May 21, 2018',
      description: 'Curved claw steel hammer',
      price: 8.9,
      starRating: 4.8,
      imageUrl: 'assets/images/hammer.png',
      tags: ['tools', 'hammer', 'construction'],
      isActive: true,
    }];

  // CONFIGURAÇÃO INICIAL DO TESTE
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [ProductsService]
    });
    productService = TestBed.inject(ProductsService);
    httpTestingController = TestBed.inject(HttpTestingController);
  });

  // EXECUÇÃO FINAL APÓS OS TESTES
  afterEach(() => {
    httpTestingController.verify();
  });


  it('Verificar criação do serviço', () => {
    expect(productService).toBeTruthy();
  });


  it('should GET all products', () => {
    productService.getProducts()
      .subscribe((data: IProduct[]) => {
        expect(data.length).toBe(3)
      });

    let productsRequest: TestRequest = httpTestingController.expectOne('api/products');

    expect(productsRequest.request.method).toEqual('GET');

    productsRequest.flush(testProducts);
  });

  // it('should return a HttpErrorResponse', () => {
  //   productService.getProducts()
  //   .subscribe(
  //     (data: IProduct[]) => fail('deve retornar um erro'),
  //     (err: HttpErrorResponse) => {
  //       expect(err.message).toEqual(`${err.error.message}`)
  //     }
  //   );

  //   let productsRequest: TestRequest = httpTestingController.expectOne('api/products');

  //   productsRequest.flush('error', {
  //     status: 500,
  //     statusText: 'Server error'
  //   });
  // });
});
