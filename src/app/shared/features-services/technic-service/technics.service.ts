import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, catchError, throwError } from 'rxjs';
import { Technics, TechnicsNews } from '../../interfaces/technology.interface';


@Injectable({
  providedIn: 'root'
})
export class TechnicsService {
  private _url:string = 'http://localhost:3000/technics'
  constructor(private http: HttpClient) { }

  public getNews():Observable<TechnicsNews[]> {
    return this.http.get<TechnicsNews[]>(this._url).pipe(
      catchError(this.handleError)
    );
  }

  public getSingleTechnicNews(id:number): Observable<TechnicsNews> {
    return this.http.get<TechnicsNews>(`${this._url}/${id}`).pipe(
      catchError(this.handleError)
    );
  }

  public addTechnicNews(news:Technics): Observable<Technics> {
    return this.http.post<Technics>(this._url,news);
  }

  public deleteSingleTechnicNews(id:number) {
    return this.http.delete(`${this._url}/${id}`);
  }

  public updateTechnicNews(id:number,body:Technics):Observable<Technics> {
    return this.http.patch<Technics>(`${this._url}/${id}`,body)
  }

  private handleError(error: HttpErrorResponse) {
    let errorMessage = '';
    if (error.status === 0) {
      console.error('An error occurred:', error.error);
    } else {
      console.error(
        `Backend returned code ${error.status}, body was: `, error.error);
        errorMessage = `Backend returned code ${error.status}, body was: `, error.error;
    }
    errorMessage+='Something bad happened; please try again later.';
    return throwError(() => new Error(errorMessage));
  }
}
