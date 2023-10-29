import { Injectable } from '@angular/core';
import { CommonInterface } from 'src/app/shared/interfaces/admin-common.interface';

@Injectable({
  providedIn: 'root'
})
export class ArticleDataService {
  constructor() {}

  private selectedNews: CommonInterface | undefined;
  showForm:boolean=false;

  changeShowForm(b:boolean) {
    this.showForm = b;
  }

  addSelectedArticle(article: CommonInterface) {
    this.selectedNews = article;
  }

  getSelectedArticle() {
    return this.selectedNews;
  }
}
