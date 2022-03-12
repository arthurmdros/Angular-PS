import { Component, ViewChild, ElementRef, OnInit, OnDestroy } from '@angular/core';
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';
import { ProductsService } from '../../services/products.service';
import { Subscription } from 'rxjs';
import { IProduct } from '../../products/entity';

@Component({
  selector: 'pm-pdf-generator',
  templateUrl: './pdf-generator.component.html',
  styleUrls: ['./pdf-generator.component.css']
})
export class PdfGeneratorComponent implements OnInit, OnDestroy {
  @ViewChild('htmlData') htmlData!: ElementRef;

  sub!: Subscription;
  products: IProduct[] = [];
  errorMessage: string = '';

  constructor(private productService:ProductsService) { }

  ngOnDestroy(): void {
    this.sub.unsubscribe();
  }

  ngOnInit(): void {
    this.sub = this.productService.getProducts().subscribe({
      next: products => {
        this.products = products;
      },
      error: err => this.errorMessage = err
    });
  }
  
  public openPDF(): void {
    let DATA: any = document.getElementById('htmlData');
    html2canvas(DATA).then((canvas) => {
      let fileWidth = 208;
      let fileHeight = (canvas.height * fileWidth) / canvas.width;
      const FILEURI = canvas.toDataURL('image/png');
      let PDF = new jsPDF('p', 'mm', 'a4');
      let position = 0;
      PDF.addImage(FILEURI, 'PNG', 0, position, fileWidth, fileHeight);
      PDF.save('relatorio.pdf');
    });
  }
}
