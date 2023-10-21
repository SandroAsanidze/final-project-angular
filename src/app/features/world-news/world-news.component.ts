import { ChangeDetectionStrategy, ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { WorldNewsService, WorldNews } from './service/world-news.service';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
@Component({
  selector: 'app-world-news',
  standalone: true,
  imports: [CommonModule,HttpClientModule,ReactiveFormsModule],
  providers:[WorldNewsService],
  templateUrl: './world-news.component.html',
  styleUrls: ['./world-news.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class WorldNewsComponent implements OnInit {
  constructor(private worldService:WorldNewsService,public cdr:ChangeDetectorRef){}
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
  // showForm:boolean=false;
  // selectedNews: WorldNews | null = null;

  // editButton(id: number) {
  //   const selected = this.worldNews.find((worldNews) => worldNews.id === id);
  //   if (selected) {
  //     this.selectedNews = selected;
  //     this.updateForm.patchValue({
  //       title:selected.title,
  //       description:selected.description,
  //       urlToImage:selected.urlToImage,
  //       content:selected.content
  //     });
  //   }
    
  //   this.showForm = !this.showForm;
  // }

  // public updateForm = this.formBuilder.group({
  //   title:['',Validators.required],
  //   description:['',Validators.required],
  //   urlToImage:['',[Validators.required,Validators.pattern(/https?:\/\/\S+\.(?:jpg|jpeg|png|gif|bmp|svg|webp)/i)]],
  //   content:['',Validators.required],
  // })

  // cancelButton() {
  //   this.showForm = false;
  // }
}
