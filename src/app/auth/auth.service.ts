import { Injectable } from '@angular/core';
import { HttpHeaders, HttpClient } from '@angular/common/http';
import { Login } from '../model/login';
import { Observable } from 'rxjs';
import { JwtResponse } from './jwt-respon';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private baseUrl = 'http://localhost:8082/rest/login/signin';

  constructor(private http: HttpClient) { }

  attemptAuth(credentials: Login): Observable<JwtResponse> {
    return this.http.post<JwtResponse>(this.baseUrl, credentials, httpOptions);
  }
}
