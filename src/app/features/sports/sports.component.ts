import { ChangeDetectionStrategy, ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { SportsNews, SportsService } from './service/sports.service';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-sports',
  standalone: true,
  imports: [CommonModule,HttpClientModule,RouterModule],
  providers:[SportsService],
  templateUrl: './sports.component.html',
  styleUrls: ['./sports.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class SportsComponent implements OnInit {
  constructor(private sportService:SportsService,public cdr:ChangeDetectorRef){}
  sports: SportsNews[]=[];

  ngOnInit(): void {
    this.sports = [];
    this.sportService.getSportsNews().subscribe(data => {
      this.sports = data;
      this.cdr.detectChanges();
    })
  }


  currentPage: number = 1;
  itemsPerPage: number = 6; 
  totalItems: number = 0;

  onePageData() {
    const startIndex = (this.currentPage - 1) * this.itemsPerPage;
    const endIndex = startIndex + this.itemsPerPage;
    return this.sports.slice(startIndex, endIndex);
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
    this.totalItems = this.sports.length;
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
    this.sportService.deleteSingleNews(id).subscribe();

    const index = this.sports.findIndex(sport => sport.id === id);
    if (index !== -1) {
      this.sports.splice(index, 1);
    }
  };
}
