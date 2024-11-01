import {Component} from '@angular/core';
import {RouterOutlet} from '@angular/router';
import {HeaderComponent} from "./layout/header/header.component";
import {FooterComponent} from "./layout/footer/footer.component";
import {SidebarComponent} from "./layout/sidebar/sidebar.component";
import {NgProgressModule} from "@ngx-progressbar/core";
import {NgProgressbar} from "ngx-progressbar";
import {NgProgressHttp} from "ngx-progressbar/http";

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, HeaderComponent, SidebarComponent, NgProgressbar, NgProgressHttp],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'maids-dashboard';
}
