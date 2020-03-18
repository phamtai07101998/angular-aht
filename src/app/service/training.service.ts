import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, Subject } from 'rxjs';
import { tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class TrainingService {

  private baseUrl = 'http://localhost:8082/rest/training';

  constructor(private http: HttpClient) { }

  private _refresh = new Subject<void>();

  get refresh(){
    return this._refresh;
  }

  getTrainingList(): Observable<any> {
    return this.http.get(`${this.baseUrl}`);
  } 

  getTrainingId(id: number): Observable<any>{
    return this.http.get(`${this.baseUrl}/${id}`);
  }

  createTraining(training: Object): Observable<any>{
    return this.http.post(`${this.baseUrl}/create`, training)
    .pipe(
      tap(() => {
        this._refresh.next();
      })
    );
  }

  updateTraining(id: number, value: any): Observable<Object>{
    return this.http.put(`${this.baseUrl}/update/${id}`, value)
    .pipe(
      tap(() => {
        this._refresh.next();
      })
    )
  }

  deleteTraining(id: number): Observable<any>{
    return this.http.delete(`${this.baseUrl}/delete/${id}`)
    .pipe(
      tap(() => {
        this._refresh.next();
      })
    )
  }

  updateStatus(date: any): Observable<any>{
    return this.http.post(`${this.baseUrl}/update-status`, date)
    .pipe(
      tap(() => {
        this._refresh.next();
      })
    )
  }

  trainingExpiers(): Observable<any>{
    return this.http.get(`${this.baseUrl}/training-xpires`);
  }
}
