import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

interface AdminInfo {
  email:string,
  password:string
}

@Injectable({
  providedIn: 'root'
})
export class LoginService {
  hideEverything:boolean=false;

  private _url:string='http://localhost:3000/information'
  constructor(private http:HttpClient) { }

  public getInfo():Observable<AdminInfo> {
    return this.http.get<AdminInfo>(this._url);
  }
}
