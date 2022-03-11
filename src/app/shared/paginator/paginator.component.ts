import { Component, OnInit, EventEmitter, Input, Output } from '@angular/core';
import {MatIconModule} from '@angular/material/icon';

@Component({
  selector: 'paginator',
  templateUrl: './paginator.component.html',
  styleUrls: ['./paginator.component.css']
})
export class PaginatorComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

  @Input()
  public page: number = 0;

  @Output()
  notifyPage: EventEmitter<number> = new EventEmitter();

  public handlePageClick(action: 'plus' | 'minus') {

    console.log(this.page);
    if (action === 'minus') {
      this.page = this.page === 0 ? 0 : this.page - 1;
    } else {
      this.page = this.page + 1;
    }

    this.notifyPage.emit(this.page);
  }

}
