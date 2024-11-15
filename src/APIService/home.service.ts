import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class HomeService {
  private apiUrl = 'http://localhost:8080/api/account'; // Replace with your API endpoint

  constructor(private http: HttpClient) { }

  getAccountInfo(): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/info`);
  }
}
