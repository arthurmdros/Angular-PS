import { Component, ViewChild, ElementRef } from '@angular/core';
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';

@Component({
  selector: 'pm-pdf-generator',
  templateUrl: './pdf-generator.component.html',
  styleUrls: ['./pdf-generator.component.css']
})
export class PdfGeneratorComponent {
  @ViewChild('htmlData') htmlData!: ElementRef;

  PRODUCTS = [
    {
      "Id": 1,
      "productName": "Leaf Rake",
      "productCode": "GDN-001",
      "releaseDate": "March 19, 2018",
      "description": "Leaf rake with 48-inch wooden handle",
      "price": 19.95,
      "starRating": 3.2,
      "imageUrl": "assets/images/leaf_rake.png",
      "tags": ["rake", "leaf", "yard", "home"]
    },
    {
      "Id": 2,
      "productName": "Garden Cart",
      "productCode": "GDN-002",
      "releaseDate": "March 18, 2018",
      "description": "15 gallon capacity rolling garden cart",
      "price": 32.99,
      "starRating": 4.2,
      "imageUrl": "assets/images/garden_cart.png"
    },
    {
      "Id": 5,
      "productName": "Hammer",
      "productCode": "TBX-004",
      "releaseDate": "May 21, 2018",
      "description": "Curved claw steel hammer",
      "price": 8.9,
      "starRating": 4.8,
      "imageUrl": "assets/images/hammer.png",
      "tags": ["tools", "hammer", "construction"]
    },
    {
      "Id": 8,
      "productName": "Saw",
      "productCode": "TBX-002",
      "releaseDate": "May 15, 2018",
      "description": "15-inch steel blade hand saw",
      "price": 11.55,
      "starRating": 3.7,
      "imageUrl": "assets/images/saw.png"
    },
    {
      "Id": 10,
      "productName": "Video Game Controller",
      "productCode": "GMG-004",
      "releaseDate": "October 15, 2018",
      "description": "Standard two-button video game controller",
      "price": 35.95,
      "starRating": 4.6,
      "imageUrl": "assets/images/xbox-controller.png"
    }
  ];

  constructor() {}

  public openPDF(): void {
    let DATA: any = document.getElementById('htmlData');
    html2canvas(DATA).then((canvas) => {
      let fileWidth = 208;
      let fileHeight = (canvas.height * fileWidth) / canvas.width;
      const FILEURI = canvas.toDataURL('image/png');
      let PDF = new jsPDF('p', 'mm', 'a4');
      let position = 0;
      PDF.addImage(FILEURI, 'PNG', 0, position, fileWidth, fileHeight);
      PDF.save('angular-demo.pdf');
    });
  }
}
