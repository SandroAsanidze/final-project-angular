import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy } from '@angular/core';
import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { HeaderComponent } from './features/header/header.component';
import { FooterComponent } from './features/footer/footer.component';
import { AddNewsComponent } from './features/add-news/add-news.component';
import { MainNewsComponent } from './features/main-news/main-news.component';

@Component({
  selector: 'app-root',
  standalone:true,
  imports:[CommonModule,RouterModule,HeaderComponent,FooterComponent,MainNewsComponent],
  changeDetection:ChangeDetectionStrategy.OnPush,
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'angular-project';

}
