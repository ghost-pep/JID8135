import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { HttpHeaders } from '@angular/common/http';
import { catchError, retry } from 'rxjs/operators';
import { Router } from '@angular/router';


@Injectable({
  providedIn: 'root'
})
export class BackendService {
  dev_url = 'http://127.0.0.1:4444/';
  url = this.dev_url;
  constructor(private http: HttpClient) { }

  createRawPolicy(data: any): Observable<any> {
    const httpOptions = {
      headers: new HttpHeaders({'Content-Type': 'application/json'}),
      withCredentials: false,
    };
    return this.http.post<any>(this.url + 'api/policy/raw', data, httpOptions)
      .pipe(
        catchError(this.handleError)
      );
  }
  getAll(): Observable<any> {
    const httpOptions = {
      headers: new HttpHeaders({'Content-Type': 'application/json'}),
      withCredentials: false,
    };
    return this.http.get<any>(this.url + 'api/policy/raw', httpOptions)
      .pipe(
        catchError(this.handleError)
      );
  }
  getPolicy(_id: string): Observable<any> {
    const httpOptions = {
      headers: new HttpHeaders({'Content-Type': 'application/json'}),
      withCredentials: false,
    };
    return this.http.get<any>(this.url + 'api/policy/raw/' + _id, httpOptions)
    .pipe(
      catchError(this.handleError)
    );
  }

  getPolicyTitle(_title: string): Observable<any> {
    const httpOptions = {
      headers: new HttpHeaders({'Content-Type': 'application/json'}),
      withCredentials: false,
    };
    return this.http.get<any>(this.url + 'api/policy/raw/title/' + _title, httpOptions)
    .pipe(
      catchError(this.handleError)
    );
  }

  uploadRawPolicy(data: any): Observable<any> {
    const httpOptions = {
      headers: new HttpHeaders({'Content-Type': 'application/json'}),
      withCredentials: false,
    };
    return this.http.post<any>(this.url + 'api/policy/raw/', JSON.stringify(data), httpOptions)
    .pipe(
      catchError(this.handleError)
    );
  }

  uploadPdfPolicy(): Observable<any> {
    const httpOptions = {
      headers: new HttpHeaders({'Content-Type': 'application/json'}),
      withCredentials: false,
    };
    return this.http.post<any>(this.url + 'api/policy/pdf/', httpOptions)
    .pipe(
      catchError(this.handleError)
    );
  }

  /* Passed in via pipe
  @returns: RxJS ErrorObservable with user-friendly message
  */
 private handleError(error: HttpErrorResponse) {
  if (error.error instanceof ErrorEvent) {
    // CLIENT SIDE ERROR
    console.error('Client side error: ' + error.message);
  } else {
    // backend returned unsuccessful response code
    console.error('Backend error: ' + String(error.status));
    console.error(error.error);
    if (error.status === 401) {
      console.error('Unauthorized!!!!');
    }
  }
  // return observable with user-facing error message
  return throwError(error.error['errorMessage']);
}
}
