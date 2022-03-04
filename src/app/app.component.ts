import { Component } from "@angular/core";


@Component({
  selector: 'pm-root',
  template: `
  <div><h1>{{pageTitle}}</h1>
    <pm-product-list></pm-product-list>
  </div>

  `
})

export class AppComponent{
  pageTitle: string = "Gerenciador de Produtos"
}
