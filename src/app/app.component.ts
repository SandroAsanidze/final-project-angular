import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy } from '@angular/core';
import { Component,OnInit  } from '@angular/core';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { HeaderComponent } from './features/header/header.component';
import { FooterComponent } from './features/footer/footer.component';
import { MainNewsComponent } from './features/main-news/main-news.component';
import { LoginService } from './features/login/service/login.service';
import { MatProgressBarModule } from '@angular/material/progress-bar';

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
  constructor(public route:ActivatedRoute,public loginService:LoginService,private router:Router){}
  hideMainNews:boolean = false;

  ngOnInit() {
    let currentRoute = this.route.snapshot.routeConfig?.path;
  
    if(currentRoute === 'login'){
      this.loginService.hideEverything = !this.loginService.hideEverything;
    }

    this.router.events.subscribe(() => {
      const currentPath = this.router.url;

      if(currentPath === '/login') {
        this.loginService.hideEverything = true;
      }
      else {
        this.loginService.hideEverything = false;
      }
      
      const route = this.router.url;
      const segments = route.split('/');
      const id = Number(segments[segments.length - 1]);
      
      if(currentPath === `/world/${id}`|| currentPath === `/technology/${id}` || currentPath === `/sport/${id}` || currentPath === '/login' || currentPath === '/weather' || currentPath === '/add-news') {
        this.hideMainNews = false;
      }
      else {
        this.hideMainNews = true
      }
  });
}

  scrollToTop() {
    window.scroll({ top: 0, left: 0, behavior: 'smooth' });
  }

  title = 'angular-project';

}
