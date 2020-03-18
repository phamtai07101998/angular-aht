import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, Subject } from 'rxjs';
import { tap } from 'rxjs/operators';
import { ReturnStatement } from '@angular/compiler';
import {map} from 'rxjs/operators';
import { TrainingEmp } from '../model/trainingEmp';

@Injectable({
  providedIn: 'root'
})
export class TrainingEmpService {

  private baseUrl = 'http://localhost:8082/rest/quanlykhoahoc';

  constructor(private http: HttpClient) { }

  private _refresh = new Subject<void>();

  get refresh(){
    return this._refresh;
  }

  getTrainingEmpList(): Observable<any> {
    return this.http.get(`${this.baseUrl}`);
  } 

  getTrainingEmpId(id: number): Observable<any>{
    return this.http.get(`${this.baseUrl}/${id}`);
  }

  createTrainingEmp(trainingEmp: Object): Observable<any>{
    return this.http.post(`${this.baseUrl}/create`, trainingEmp)
    .pipe(
      tap(() => {
        this._refresh.next();
      })
    );
  }

  updateTrainingEmp(id: number, value: any): Observable<Object>{
    return this.http.put(`${this.baseUrl}/update/${id}`, value)
    .pipe(
      tap(() => {
        this._refresh.next();
      })
    );
  }

  deleteTrainingEmp(id: number): Observable<any>{
    return this.http.delete(`${this.baseUrl}/delete/${id}`)
    .pipe(
      tap(() => {
        this._refresh.next();
      })
    );
  }

  getEmpByTrainingId(id: number): Observable<any>{
    return this.http.get(`${this.baseUrl}/detail/${id}`);
  }

  trungTen(trainingId: number, empId: number): Observable<any>{
    return this.http.get(`${this.baseUrl}/same-name/${trainingId}/${empId}`)
  }
}
