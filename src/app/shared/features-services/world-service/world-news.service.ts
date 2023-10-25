import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, catchError, throwError } from 'rxjs';
import { WorldNews,World } from '../../interfaces/world.interface';


@Injectable({
  providedIn: 'root'
})
export class WorldNewsService {
  private _url:string = 'http://localhost:3000/world';
  constructor(private http:HttpClient) { }

  public getWorldNews():Observable<WorldNews[]> {
    return this.http.get<WorldNews[]>(this._url).pipe(
      catchError(this.handleError)
    );
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