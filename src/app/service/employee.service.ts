import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, Subject } from 'rxjs';
import { Employee } from '../model/employee';
import { tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class EmployeeService {

  private baseUrl = 'http://localhost:8082/rest/employee';

  constructor(private http: HttpClient) { }

  private _refresh = new Subject<void>();

  get refresh(){
    return this._refresh;
  }

  getEmployeeList(): Observable<any> {
    return this.http.get(`${this.baseUrl}`);
  } 

  getEmployeeId(id: number): Observable<any>{
    return this.http.get(`${this.baseUrl}/${id}`);
  }

  createEmployee(employee: Employee): Observable<any>{
    return this.http.post(`${this.baseUrl}/create`, employee)
    .pipe(
      tap(() =>{
        this._refresh.next();
      })
    );
  }

  updateEmployee(id: number, value: any): Observable<Object>{
    return this.http.put(`${this.baseUrl}/update/${id}`, value)
    .pipe(
      tap(() =>{
        this._refresh.next();
      })
    );
  }

  deleteEmployee(id: number): Observable<any>{
    return this.http.delete(`${this.baseUrl}/delete/${id}`)
    .pipe(
      tap(() =>{
        this._refresh.next();
      })
    );
  }

  getEmployeeByType(type: number): Observable<any>{
    return this.http.get(`${this.baseUrl}/type/${type}`)
    .pipe(
      tap(() =>{
        this._refresh.next();
      })
    );
  }

  getEmployeeByTypeContract(type: number): Observable<any>{
    return this.http.get(`${this.baseUrl}/contract-type/${type}`)
    .pipe(
      tap(() =>{
        this._refresh.next();
      })
    );
  }

  filterEmpByDepartment(partId: number, departId: number): Observable<any>{
    return this.http.get(`${this.baseUrl}/department/${partId}/${departId}`)
    .pipe(
      tap(() =>{
        this._refresh.next();
      })
    );
  }

  getEmpContract(): Observable<any>{
    return this.http.get(`${this.baseUrl}/nv-con-hop-dong`)
    .pipe(
      tap(() =>{
        this._refresh.next();
      })
    );
  }

  getEmpContractExpiers(): Observable<any>{
    return this.http.get(`${this.baseUrl}/nv-het-hop-dong`)
    .pipe(
      tap(() =>{
        this._refresh.next();
      })
    );
  }
}
