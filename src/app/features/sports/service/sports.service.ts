import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

export interface SportsNews {
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

}
