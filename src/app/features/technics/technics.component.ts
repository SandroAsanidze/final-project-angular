import { ChangeDetectionStrategy, ChangeDetectorRef, Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { TechnicsNews, TechnicsService } from './service/technics.service';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-technics',
  standalone: true,
  imports: [CommonModule,HttpClientModule,RouterModule],
  providers:[TechnicsService],
  templateUrl: './technics.component.html',
  styleUrls: ['./technics.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class TechnicsComponent {
  articles: TechnicsNews[]=[];

  constructor(private technicsService:TechnicsService,public cdr:ChangeDetectorRef){}

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
}
