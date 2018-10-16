import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class HumanService {
  constructor(private _http: HttpClient) { }
  getHumans(){
    return this._http.get('/api/humans');
  }
}
