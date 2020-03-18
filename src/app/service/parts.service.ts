import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, Subject } from 'rxjs';
import { Parts } from '../model/parts';
import { tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class PartsService {

  private baseUrl = 'http://localhost:8082/rest/parts';

  constructor(private http: HttpClient) { }
  private _refresh = new Subject<void>();

  get refresh(){
    return this._refresh;
  }

  getPartsList(): Observable<any>{
    return this.http.get(`${this.baseUrl}`);
  }

  getPartsId(id: number): Observable<any>{
    return this.http.get(`${this.baseUrl}/${id}`);
  }

  createParts(parts: Parts): Observable<any>{
    return this.http.post(`${this.baseUrl}/create`, parts)
    .pipe(
      tap(() =>{
        this._refresh.next();
      })
    );
  }

  updateParts(id: number, value: any): Observable<Object>{
    return this.http.put(`${this.baseUrl}/update/${id}`, value)
    .pipe(
      tap(() =>{
        this._refresh.next();
      })
    );
  }

  deleteParts(id: number): Observable<any>{
    return this.http.delete(`${this.baseUrl}/delete/${id}`).pipe(
      tap(() =>{
        this._refresh.next();
      })
    );
  }
}
