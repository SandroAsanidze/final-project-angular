import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy } from '@angular/core';
import { Component,OnInit  } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { HeaderComponent } from './features/header/header.component';
import { FooterComponent } from './features/footer/footer.component';
import { MainNewsComponent } from './features/main-news/main-news.component';

@Component({
  selector: 'app-root',
  standalone:true,
  imports:[CommonModule,RouterModule,HeaderComponent,FooterComponent,MainNewsComponent],
  providers:[],
  changeDetection:ChangeDetectionStrategy.OnPush,
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  constructor(private router:Router){}
  hideMainNews:boolean = false;

  ngOnInit() {
    this.router.events.subscribe(() => {
      const currentPath = this.router.routerState.snapshot.url;
        
      if(currentPath === '/login' || currentPath === '/weather' || currentPath === '/add-news') {
        this.hideMainNews = false;
      }
      else {
        this.hideMainNews = true
      }
  });
}

  title = 'angular-project';

}
