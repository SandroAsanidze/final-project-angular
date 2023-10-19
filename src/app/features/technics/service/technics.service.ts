import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
export interface TechnicsNews {
  id: number;
  title: string;
  description: string;
  urlToImage: string;
  publishedAt: string;
  content: string;
}

export interface Technics {
  title: string;
  description: string;
  urlToImage: string;
  content: string;
}

@Injectable({
  providedIn: 'root'
})
export class TechnicsService {
  private _url:string = 'http://localhost:3000/technics'
  constructor(private http: HttpClient) { }

  public getNews():Observable<TechnicsNews[]> {
    return this.http.get<TechnicsNews[]>(this._url);
  }

  public getSingleTechnicNews(id:number): Observable<TechnicsNews> {
    return this.http.get<TechnicsNews>(`${this._url}/${id}`);
  }

  public addTechnicNews(news:Technics): Observable<Technics> {
    return this.http.post<Technics>(this._url,news);
  }

  public deleteSingleTechnicNews(id:number) {
    return this.http.delete(`${this._url}/${id}`);
  }
}
