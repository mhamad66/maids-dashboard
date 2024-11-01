import { Component } from '@angular/core';
import {MainChartComponent} from "./main-chart/main-chart.component";
import {MainTableComponent} from "./main-table/main-table.component";

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [
    MainChartComponent,
    MainTableComponent
  ],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent {

}
