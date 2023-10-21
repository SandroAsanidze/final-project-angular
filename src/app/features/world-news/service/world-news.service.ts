import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

export interface WorldNews {
  id:number,
  title: string;
  description: string;
  urlToImage: string;
  content: string;
}
export interface World {
  title: string;
  description: string;
  urlToImage: string;
  content: string;
}

@Injectable({
  providedIn: 'root'
})
export class WorldNewsService {
  private _url:string = 'http://localhost:3000/world';
  constructor(private http:HttpClient) { }

  public getWorldNews():Observable<WorldNews[]> {
    return this.http.get<WorldNews[]>(this._url);
  }

  public getSingleWorldNews(id:number): Observable<WorldNews> {
    return this.http.get<WorldNews>(`${this._url}/${id}`);
  }

  public addWorldNews(news:World): Observable<World> {
    return this.http.post<World>(this._url,news);
  }

  public deleteSingleWorldNews(id:number) {
    return this.http.delete(`${this._url}/${id}`);
  }

  public updateWorldNews(id:number,body:World):Observable<World> {
    return this.http.patch<World>(`${this._url}/${id}`,body)
  }
}
