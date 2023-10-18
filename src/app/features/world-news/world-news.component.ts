import { ChangeDetectionStrategy, ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { WorlNewsService, WorldNews } from './service/world-news.service';


@Component({
  selector: 'app-world-news',
  standalone: true,
  imports: [CommonModule,HttpClientModule],
  providers:[WorlNewsService],
  templateUrl: './world-news.component.html',
  styleUrls: ['./world-news.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class WorldNewsComponent implements OnInit {
  constructor(private worldService:WorlNewsService,public cdr:ChangeDetectorRef){}
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
}
