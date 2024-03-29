import { ChangeDetectionStrategy, ChangeDetectorRef, Component, HostListener } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ArticleDataService } from 'src/app/shared/features-services/article-service/article-data.service';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { ForupdateComponent } from '../forupdate/forupdate.component';
import { TechnicsService } from 'src/app/shared/features-services/technic-service/technics.service';
import { SportService } from 'src/app/shared/features-services/sport-service/sport.service';
import { WorldNewsService } from 'src/app/shared/features-services/world-service/world-news.service';
import { SportsNews } from 'src/app/shared/interfaces/sports.interface';
import { WorldNews } from 'src/app/shared/interfaces/world.interface';
import { CommonInterface } from 'src/app/shared/interfaces/admin-common.interface';

@Component({
  selector: 'app-news',
  standalone: true,
  imports: [CommonModule,HttpClientModule,RouterModule,ForupdateComponent],
  providers:[WorldNewsService,HttpClient,TechnicsService,SportService],
  templateUrl: './news.component.html',
  styleUrls: ['./news.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class NewsComponent {
  @HostListener('document:click',['$event'])
  onClick(event:any){
    const el = document.querySelector('.pop-up');
    
    if((event.target as HTMLElement).classList.contains('edit')) {
      this.articleDataService.changeShowForm(true);
    }
    else {
      if(el && !el.contains(event.target as Node) && this.articleDataService.showForm) {
        this.articleDataService.changeShowForm(false);
      }
    }
  }
  constructor(
    private route: ActivatedRoute,
    private worldService:WorldNewsService,
    private technicService:TechnicsService,
    private router:Router,
    private sportService:SportService,
    public cdr:ChangeDetectorRef,
    public articleDataService:ArticleDataService
  ){}
  news: SportsNews[]=[];
  currentPath:string | undefined;
  errorMessage:string='';

  goToHome() {
    this.router.navigate(['home'])
  }

  ngOnInit(): void {
      let currentRoute = this.route.snapshot.routeConfig?.path;

      this.currentPath = currentRoute;

      if(currentRoute === 'sport'){
        this.news = [];
        this.sportService.getSportsNews().subscribe(data => {
          this.news = data;
        },(error) => {
          this.errorMessage = error;
          this.cdr.detectChanges();
        })

      }

      if(currentRoute === 'technology'){
        this.news = [];
        this.technicService.getNews().subscribe(data => {
          this.news = data;
        },(error) => {
          this.errorMessage = error;
          this.cdr.detectChanges();
        })
      }

      if(currentRoute === 'world'){
        this.news = [];
        this.worldService.getWorldNews().subscribe(data => {
          this.news = data;
        },(error) => {
          this.errorMessage = error;
          this.cdr.detectChanges();
        })
      }
      this.route.data.subscribe((m:any) => {
        this.news = m.resolveNews;
      })
  }


  currentPage: number = 1;
  itemsPerPage: number = 5; 
  totalItems: number = 0;

  onePageData() {
    const startIndex = (this.currentPage - 1) * this.itemsPerPage;
    const endIndex = startIndex + this.itemsPerPage;
    return this.news.slice(startIndex, endIndex);
  }

  previousPage() {
    if (this.currentPage > 1) {
      this.currentPage--;
    }
  }
  
  nextPage() {
    if (this.currentPage < this.totalPages) {
      this.currentPage++;
    }
  }

  get totalPages():number {
    this.totalItems = this.news.length;
    return Math.ceil(this.totalItems / this.itemsPerPage);
  }

  get pageNumbers(): number[] {
    const pages = [];
    for (let i = 1; i <= this.totalPages; i++) {
      pages.push(i);
    }
    return pages;
  }



  //scrollToTop
  scrollToTop() {
    window.scroll({ top: 0, left: 0, behavior: 'smooth' });
  }

  isAdminTrue() {
    if(localStorage.getItem('isAdmin') === 'true') {
      return true;
    }
    else {
      return false;
    }
  }

  

  public deleteNews(id:number) {
    const route = this.router.url;
    const segments = route.split('/');
    this.currentPath = segments[1];
    const confirmation = confirm('Are you sure you want to Delete ?');
    if (confirmation) {
      if(segments[1] === 'sport'){
        this.sportService.deleteSingleNews(id).subscribe();
    
        const index = this.news.findIndex(news => news.id === id);
        if (index !== -1) {
          this.news.splice(index, 1);
        }
      }
  
      if(segments[1] === 'technology'){
        this.technicService.deleteSingleTechnicNews(id).subscribe();
  
        const index = this.news.findIndex(news => news.id === id);
        if (index !== -1) {
          this.news.splice(index, 1);
        }
      }
  
      if(segments[1] === 'world'){
        this.worldService.deleteSingleWorldNews(id).subscribe();
  
        const index = this.news.findIndex(news => news.id === id);
        if (index !== -1) {
          this.news.splice(index, 1);
        }
      }

    }
  };

  selectedNews: WorldNews | null = null;

  editButton(article: CommonInterface) {
    this.articleDataService.addSelectedArticle(article);
    this.articleDataService.changeShowForm(!this.articleDataService.showForm);
  }
}
