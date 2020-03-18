import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, Subject } from 'rxjs';
import { Department } from '../model/department';
import { tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class DepartmentService {

  private baseUrl = 'http://localhost:8082/rest/department';

  constructor(private http: HttpClient) { }

  private _refresh = new Subject<void>();

  get refresh(){
    return this._refresh;
  }

  getDepartmentList(): Observable<any> {
    return this.http.get(`${this.baseUrl}`);
  } 

  getDepartmentId(id: number): Observable<any>{
    return this.http.get(`${this.baseUrl}/${id}`);
  }

  createDepartment(department: Department): Observable<any>{
    return this.http.post(`${this.baseUrl}/create`, department)
    .pipe(
      tap(() =>{
        this._refresh.next();
      })
    );
  }

  updateDepartment(id: number, value: any): Observable<Object>{
    return this.http.put(`${this.baseUrl}/update/${id}`, value)
    .pipe(
      tap(() =>{
        this._refresh.next();
      })
    );
  }

  deleteDepartment(id: number): Observable<any>{
    return this.http.delete(`${this.baseUrl}/delete/${id}`)
    .pipe(
      tap(() =>{
        this._refresh.next();
      })
    );
  }
}
