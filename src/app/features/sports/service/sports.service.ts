import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class SportsService {
  private _url:string='';
  constructor(private http:HttpClient) { }

}
