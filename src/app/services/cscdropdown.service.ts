import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class CscService {

  apiBaseUrl = 'http://172.16.0.99:7894/';

  constructor(private http: HttpClient) { }

  getCountries() {
    return this.http.get(`${this.apiBaseUrl}api/profilemaster/GetCountryList`).pipe(
      catchError(this.handleError)
    );
  }

  getStates(countryId: number) {
    return this.http.get(`${this.apiBaseUrl}api/profilemaster/GetStateList?CountryId=${countryId}`).pipe(
      catchError(this.handleError)
    );
  }

  getCities(stateId: number) {
    return this.http.get(`${this.apiBaseUrl}api/ProfileMaster/GetCityList?StateId=${stateId}`).pipe(
      catchError(this.handleError)
    );
  }

  private handleError(error: HttpErrorResponse) {
    if (error.error instanceof ErrorEvent) {
      // A client-side or network error occurred. Handle it accordingly.
      console.error('An error occurred:', error.error.message);
    } else {
      // The backend returned an unsuccessful response code.
      // The response body may contain clues as to what went wrong,
      console.error(`Backend returned code ${error.status}, ` + `body was: ${error.error}`);
    }
    // return an observable with a user-facing error message
    return throwError('Something bad happened. Please try again later.');
  }
}
