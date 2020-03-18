import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import { Observable, Subject } from 'rxjs';
import { tap } from 'rxjs/operators';
@Injectable({
  providedIn: 'root'
})
export class UserRoleService {
  private baseUrl = 'http://localhost:8082/rest/userRole';
  constructor(private http: HttpClient) { }

  private _refresh = new Subject<void>();

  get refersh(){
    return this._refresh;
  }

  getUserRoleList(): Observable<any>{
    return this.http.get(`${this.baseUrl}`);
  }

  updateUserRole(id: number, value: any): Observable<Object>{
    return this.http.put(`${this.baseUrl}/update/${id}`, value)
    .pipe(
      tap(() =>{
        this._refresh.next();
      })
    );
  }

  createUserRole(user: Object): Observable<Object>{
    return this.http.post(`${this.baseUrl}/create`, user)
    .pipe(
      tap(() =>{
        this._refresh.next();
      })
    );
  }

  deleteUserRole(id: number): Observable<any>{
    return this.http.delete(`${this.baseUrl}/delete/${id}`)
    .pipe(
      tap(()=>{
        this._refresh.next();
      })
    );
  }

  getUserRoleId(id: number): Observable<any>{
    return this.http.get(`${this.baseUrl}/${id}`);
  }
}
