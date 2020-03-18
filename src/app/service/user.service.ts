import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import {HttpClient} from '@angular/common/http';
import { Users } from '../model/user';
import {map, catchError} from 'rxjs/operators';



@Injectable({
  providedIn: 'root'
})
export class UserService {

  private baseUrl = 'http://localhost:8082/rest/user';

  constructor(private http: HttpClient) { }

  getUserList(): Observable<any> {
    return this.http.get(`${this.baseUrl}`);
  } 

  getUserId(id: number): Observable<any>{
    return this.http.get(`${this.baseUrl}/${id}`).
    pipe(
      map((data: any) =>{ return data;
      }), catchError(error => {return throwError("bi loi roi ne")})
    )
  }

  createUser(user: Users): Observable<any>{
    return this.http.post(`${this.baseUrl}/create`, user);
  }

  updateUser(id: number, value: any): Observable<Object>{
    return this.http.put(`${this.baseUrl}/update/${id}`, value);
  }

  deleteUser(id: number): Observable<any>{
    return this.http.delete(`${this.baseUrl}/delete/${id}`);
  }
}
