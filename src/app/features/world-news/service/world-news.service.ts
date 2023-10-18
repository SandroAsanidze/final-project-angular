import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

export interface WorldNews {
  title: string;
  description: string;
  urlToImage: string;
  content: string;
}

@Injectable({
  providedIn: 'root'
})
export class WorlNewsService {
  private _url:string = 'http://localhost:3000/world';
  constructor(private http:HttpClient) { }

  public getWorldNews():Observable<WorldNews[]> {
    return this.http.get<WorldNews[]>(this._url);
  }
}
