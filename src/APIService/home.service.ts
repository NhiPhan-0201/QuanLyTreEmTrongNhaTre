import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class HomeService {

  private apiUrl = 'http://localhost:8080'; // Spring Boot backend URL

  constructor(private http: HttpClient) { }

  getAccountId(): Observable<number> {
    return this.http.get<number>(`${this.apiUrl}/getAccountId`); // Adjust endpoint as necessary
  }
}
