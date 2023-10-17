import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
export interface TechnicsNews {
  source: {
    id: string | null;
    name: string;
  };
  author: string;
  title: string;
  description: string;
  url: string;
  urlToImage: string;
  publishedAt: string;
  content: string;
}

@Injectable({
  providedIn: 'root'
})
export class TechnicsService {
  private url:string = 'http://localhost:3000/technics'
  constructor(private http: HttpClient) { }

  public getNews():Observable<TechnicsNews[]> {
    return this.http.get<TechnicsNews[]>(this.url);
  }
}
