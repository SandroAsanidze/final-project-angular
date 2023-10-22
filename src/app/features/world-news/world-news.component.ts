import { ChangeDetectionStrategy, ChangeDetectorRef, Component, Input, OnInit, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { WorldNewsService, WorldNews, World } from './service/world-news.service';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { ForupdateComponent } from '../forupdate/forupdate.component';
import { TechnicsService } from '../technics/service/technics.service';
import { SportsService } from '../sports/service/sports.service';
import { ArticleDataService } from 'src/app/core/services/article-data.service';
import { CommonInterface } from '../add-news/add-news.component';
@Component({
  selector: 'app-world-news',
  standalone: true,
  imports: [CommonModule,HttpClientModule,ReactiveFormsModule,RouterModule,ForupdateComponent],
  providers:[WorldNewsService,HttpClient,TechnicsService,SportsService],
  templateUrl: './world-news.component.html',
  styleUrls: ['./world-news.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class WorldNewsComponent implements OnInit {
  constructor(public articleDataService: ArticleDataService,private formBuilder:FormBuilder,private worldService:WorldNewsService,public cdr:ChangeDetectorRef){}
  worldNews: WorldNews[]=[];

  ngOnInit(): void {
    this.worldNews = [];
    this.worldService.getWorldNews().subscribe(data => {
      this.worldNews = data;
      this.cdr.detectChanges();
    })
  }

  currentPage: number = 1;
  itemsPerPage: number = 6; 
  totalItems: number = 0;

  onePageData() {
    const startIndex = (this.currentPage - 1) * this.itemsPerPage;
    const endIndex = startIndex + this.itemsPerPage;
    return this.worldNews.slice(startIndex, endIndex);
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
    this.totalItems = this.worldNews.length;
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
    this.worldService.deleteSingleWorldNews(id).subscribe();

    const index = this.worldNews.findIndex(news => news.id === id);
    if (index !== -1) {
      this.worldNews.splice(index, 1);
    }
  };
  
  selectedNews: WorldNews | null = null;

  editButton(article: CommonInterface) {
    this.articleDataService.addSelectedArticle(article);
    this.articleDataService.changeShowForm(!this.articleDataService.showForm);
    window.scroll({ top: 10000, left: 0, behavior: 'smooth' });
  }

  public updateForm = this.formBuilder.group({
    title:['',Validators.required],
    description:['',Validators.required],
    urlToImage:['',[Validators.required,Validators.pattern(/https?:\/\/\S+\.(?:jpg|jpeg|png|gif|bmp|svg|webp)/i)]],
    content:['',Validators.required],
  })
}
