import { ChangeDetectionStrategy, ChangeDetectorRef, Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { TechnicsNews, TechnicsService } from './service/technics.service';
import { RouterModule } from '@angular/router';
import { WorldNews, WorldNewsService } from '../world-news/service/world-news.service';
import { CommonInterface } from '../add-news/add-news.component';
import { SportsService } from '../sports/service/sports.service';
import { FormBuilder, Validators } from '@angular/forms';
import { ArticleDataService } from 'src/app/core/services/article-data.service';
import { ForupdateComponent } from '../forupdate/forupdate.component';

@Component({
  selector: 'app-technics',
  standalone: true,
  imports: [CommonModule,HttpClientModule,RouterModule,ForupdateComponent],
  providers:[WorldNewsService,HttpClient,TechnicsService,SportsService],
  templateUrl: './technics.component.html',
  styleUrls: ['./technics.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class TechnicsComponent {
  articles: TechnicsNews[]=[];

  constructor(private technicsService:TechnicsService,public cdr:ChangeDetectorRef,private formBuilder:FormBuilder, public articleDataService:ArticleDataService){}

  ngOnInit(): void {
    this.articles = [];
    this.technicsService.getNews().subscribe(data => {
      this.articles = data;
      this.cdr.detectChanges();
    })
  }

  currentPage: number = 1;
  itemsPerPage: number = 6; 
  totalItems: number = 0;

  onePageData() {
    const startIndex = (this.currentPage - 1) * this.itemsPerPage;
    const endIndex = startIndex + this.itemsPerPage;
    return this.articles.slice(startIndex, endIndex);
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
    this.totalItems = this.articles.length;
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
    this.technicsService.deleteSingleTechnicNews(id).subscribe();

    const index = this.articles.findIndex(article => article.id === id);
    if (index !== -1) {
      this.articles.splice(index, 1);
    }
  };

  selectedNews: WorldNews | null = null;

  editButton(article: CommonInterface) {
    this.articleDataService.addSelectedArticle(article);
    this.articleDataService.changeShowForm(!this.articleDataService.showForm);
    window.scroll({ top: 100000, left: 0, behavior: 'smooth' });;
  }

  public updateForm = this.formBuilder.group({
    title:['',Validators.required],
    description:['',Validators.required],
    urlToImage:['',[Validators.required,Validators.pattern(/https?:\/\/\S+\.(?:jpg|jpeg|png|gif|bmp|svg|webp)/i)]],
    content:['',Validators.required],
  })
}
