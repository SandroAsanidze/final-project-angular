import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Sport } from '../../add-news/add-news.component';

export interface SportsNews {
  id: number;
  title: string;
  description: string;
  urlToImage: string;
  content: string;
}

@Injectable({
  providedIn: 'root'
})
export class SportsService {
  private _url:string='http://localhost:3000/sports';
  constructor(private http:HttpClient) { }

  public getSportsNews():Observable<SportsNews[]> {
    return this.http.get<SportsNews[]>(this._url);
  }

  public getSingleNews(id:number): Observable<SportsNews> {
    return this.http.get<SportsNews>(`${this._url}/${id}`);
  }

  public addNews(news:Sport): Observable<Sport> {
    return this.http.post<Sport>(this._url,news);
  }

  public deleteSingleNews(id:number) {
    return this.http.delete(`${this._url}/${id}`);
  }
}
