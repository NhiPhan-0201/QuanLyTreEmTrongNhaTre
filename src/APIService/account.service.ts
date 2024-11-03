import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Account } from '../models/Account';
import { CRUDService } from './CRUD.service.interface';
import { ApiResponse } from '../models/ApiResponse.interface';

@Injectable({
  providedIn: 'root'
})
export class AccountService implements CRUDService<Account> {
  private apiUrl = 'http://localhost:8080/api/v1/admin/account';
  constructor(private http: HttpClient) { }

  private getHeaders() {
    const token = "eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJhZG1pbiIsImlhdCI6MTczMDY0MTQ1NiwiZXhwIjoxNzMwNzI3ODU2fQ.NVOj-GLg64OfEix-uXYgUrwV0CivgJiaxWn1iRs0aRE";
    return {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    };
  }

  getParents(): Observable<ApiResponse<Account[]>> {
    return this.http.get<ApiResponse<Account[]>>(`${this.apiUrl}/parent`, { headers: this.getHeaders() });
  }

  getTeachers(): Observable<ApiResponse<Account[]>> {
    return this.http.get<ApiResponse<Account[]>>(`${this.apiUrl}/teacher`, { headers: this.getHeaders() });
  }
  getAll(): Observable<ApiResponse<Account[]>> {
    return this.http.get<ApiResponse<Account[]>>(this.apiUrl, { headers: this.getHeaders() });
  }

  get(id: number): Observable<ApiResponse<Account>> {
    return this.http.get<ApiResponse<Account>>(`${this.apiUrl}/${id}`, { headers: this.getHeaders() });
  }

  add(account: Account): Observable<ApiResponse<Account>> {
    return this.http.post<ApiResponse<Account>>(this.apiUrl, account, { headers: this.getHeaders() });
  }

  update(account: Account): Observable<ApiResponse<Account>> {
    return this.http.put<ApiResponse<Account>>(`${this.apiUrl}/${account.id}`, account, { headers: this.getHeaders() });
  }

  delete(id: number): Observable<ApiResponse<null | string>> {
    return this.http.delete<ApiResponse<null | string>>(`${this.apiUrl}/${id}`, { headers: this.getHeaders() });
  }
}
