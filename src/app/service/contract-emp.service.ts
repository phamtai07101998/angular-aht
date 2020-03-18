import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { ContractEmp } from '../model/contract-emp';
import { tap } from 'rxjs/operators';
import { TokenStorageService } from '../auth/token-storage.service';

@Injectable({
  providedIn: 'root'
})
export class ContractEmpService {

  private baseUrl = 'http://localhost:8082/rest/contractEmp';
  username = 'admin'
  password = 'eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiJhZG1pbiIsImlhdCI6MTU4NDQzOTY3NSwiZXhwIjoxNTg0NTI2MDc1fQ.9CN8GC5L0ZQqZsL5zAigGfwV73Pf8SJdHx37UPDzpDduvsge8nc1tOddorm1ZDEF6ppKp5295uDx7cCAPO2Vkg'
  constructor(private http: HttpClient, private token: TokenStorageService) {

  }

  private _refresh = new Subject<void>();

  get refresh() {
    return this._refresh;
  }

  getContractEmp(): Observable<any> {
    const headers = new HttpHeaders({ Authorization: 'Basic ' + btoa(this.username + ':' + this.password) });
    return this.http.get(`${this.baseUrl}`, { headers });
  }

  getContractEmpId(id: number): Observable<any> {
    const headers = new HttpHeaders({ Authorization: 'Basic ' + btoa(this.username + ':' + this.password) });
    return this.http.get(`${this.baseUrl}/${id}`, { headers });
  }

  createContractEmp(contract: ContractEmp): Observable<any> {
    const headers = new HttpHeaders({ Authorization: 'Basic ' + btoa(this.username + ':' + this.password) });
    return this.http.post(`${this.baseUrl}/create`, contract, { headers })
      .pipe(
        tap(() => {
          this._refresh.next();
        })
      );
  }

  updateContractEmp(id: number, value: any): Observable<Object> {
    const headers = new HttpHeaders({ Authorization: 'Basic ' + btoa(this.username + ':' + this.password) });
    return this.http.put(`${this.baseUrl}/update/${id}`, value, { headers })
      .pipe(
        tap(() => {
          this._refresh.next();
        })
      );
  }

  deleteContractEmp(id: number): Observable<any> {
    const headers = new HttpHeaders({ Authorization: 'Basic ' + btoa(this.username + ':' + this.password) });
    return this.http.delete(`${this.baseUrl}/delete/${id}`, { headers })
      .pipe(
        tap(() => {
          this._refresh.next();
        })
      );
  }

  updateStatus(date: any): Observable<any> {
    const headers = new HttpHeaders({ Authorization: 'Basic ' + btoa(this.username + ':' + this.password) });
    return this.http.post(`${this.baseUrl}/update-date`, date, { headers })
      .pipe(
        tap(() => {
          this._refresh.next();
        })
      );
  }
}
