import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Contract } from '../model/contract';

@Injectable({
  providedIn: 'root'
})
export class ContractService {

  private baseUrl = 'http://localhost:8082/rest/contract';

  constructor(private http: HttpClient) { }

  getContract():Observable<any>{
    return this.http.get(`${this.baseUrl}`);
  }

  getContractId(id: number): Observable<any>{
    return this.http.get(`${this.baseUrl}/${id}`);
  }

  createContract(contract: Contract): Observable<any>{
    return this.http.post(`${this.baseUrl}/create`, contract);
  }

  updateContract(id: number, value: any): Observable<Object>{
    return this.http.put(`${this.baseUrl}/update/${id}`, value);
  }

  deleteContract(id: number): Observable<any>{
    return this.http.delete(`${this.baseUrl}/delete/${id}`);
  }
}
