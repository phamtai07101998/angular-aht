import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class RoleService {
  private baseUrl = 'http://localhost:8082/rest/role';
  constructor(private http: HttpClient) { }

  getRole(): Observable<any>{
    return this.http.get(`${this.baseUrl}`);
  }

  getRoleById(id: number): Observable<any>{
    return this.http.get(`${this.baseUrl}/${id}`);
  }
}
