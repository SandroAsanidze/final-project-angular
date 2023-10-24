import { ChangeDetectionStrategy, ChangeDetectorRef, Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { WorldNews, WorldNewsService } from '../features-services/world-service/world-news.service';
import { CommonInterface } from '../add-news/add-news.component';
import { FormBuilder, Validators } from '@angular/forms';
import { ArticleDataService } from 'src/app/core/services/article-data.service';
import { TechnicsNews, TechnicsService } from '../features-services/technic-service/technics.service';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { ForupdateComponent } from '../forupdate/forupdate.component';
import { SportService, SportsNews } from '../features-services/sport-service/sport.service';

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
  constructor(
    private route: ActivatedRoute,
    private worldService:WorldNewsService,
    private technicService:TechnicsService,
    private router:Router,
    private sportService:SportService,
    public cdr:ChangeDetectorRef,
    private formBuilder:FormBuilder,
    public articleDataService:ArticleDataService
  ){}
  news: SportsNews[]=[];
  currentPath:string | undefined;

  ngOnInit(): void {
      let currentRoute = this.route.snapshot.routeConfig?.path;

      this.currentPath = currentRoute;

      if(currentRoute === 'sport'){
        this.news = [];
        this.sportService.getSportsNews().subscribe(data => {
          this.news = data;
          this.cdr.detectChanges();
        })

      }

      if(currentRoute === 'technology'){
        this.news = [];
        this.technicService.getNews().subscribe(data => {
          this.news = data;
          this.cdr.detectChanges();
        })
      }

      if(currentRoute === 'world'){
        this.news = [];
        this.worldService.getWorldNews().subscribe(data => {
          this.news = data;
          this.cdr.detectChanges();
        })
      }
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

  public updateForm = this.formBuilder.group({
    title:['',Validators.required],
    description:['',Validators.required],
    urlToImage:['',[Validators.required,Validators.pattern(/https?:\/\/\S+\.(?:jpg|jpeg|png|gif|bmp|svg|webp)/i)]],
    content:['',Validators.required],
  })
}
