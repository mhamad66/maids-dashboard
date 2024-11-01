import {Component} from '@angular/core';
import {TableModule} from "primeng/table";
import {products} from "../../data/data";

@Component({
  selector: 'app-main-table',
  standalone: true,
  imports: [
    TableModule
  ],
  templateUrl: './main-table.component.html',
  styleUrl: './main-table.component.scss'
})
export class MainTableComponent {
  products: any[] = products;

}
