import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Account } from '../models/Account';
import { CRUDService } from './CRUD.service.interface';
import { ApiResponse } from '../models/ApiResponse.interface';
import { access_token } from '../constants/test_api';
import { AccountRole } from '../constants/enums';

@Injectable({
  providedIn: 'root'
})
export class AccountService implements CRUDService<Account> {
  private apiUrl = 'http://localhost:8080/api/v1/admin/account';
  constructor(private http: HttpClient) { }

  private getHeaders() {
    const token = access_token;
    return {
      'Authorization': `Bearer ${token}`
    };
  }

  getParents(): Observable<Account[]> {
    return this.http.get<Account[]>(`${this.apiUrl}/parent`, { headers: this.getHeaders() });
  }

  getTeachers(): Observable<Account[]> {
    return this.http.get<Account[]>(`${this.apiUrl}/teacher`, { headers: this.getHeaders() });
  }
  getAll(): Observable<Account[]> {
    return this.http.get<Account[]>(this.apiUrl, { headers: this.getHeaders() });
  }

  get(id: number): Observable<Account> {
    return this.http.get<Account>(`${this.apiUrl}/${id}`, { headers: this.getHeaders() });
  }

  add(account: Account): Observable<Account> {
    let formData = {
      username: account.username,
      password: account.password,
      role: account.role,
      status: account.status,
      ...(account.role === AccountRole.GiaoVien ? { giaoVien: account.giaoVien } : {}),
      ...(account.role === AccountRole.PhuHuynh ? { phuHuynh: account.phuHuynh } : {})
    }
    return this.http.post<Account>(this.apiUrl, formData, { headers: this.getHeaders() });
  }

  update(account: Account): Observable<Account> {
    let formData = {
      username: account.username,
      password: account.password,
      role: account.role,
      status: account.status,
      ...(account.role === AccountRole.GiaoVien ? { giaoVien: account.giaoVien } : {}),
      ...(account.role === AccountRole.PhuHuynh ? { phuHuynh: account.phuHuynh } : {})
    }
    return this.http.put<Account>(`${this.apiUrl}/${account.id}`, formData, { headers: this.getHeaders() });
  }

  delete(id: number): Observable<null | string> {
    return this.http.delete<null | string>(`${this.apiUrl}/${id}`, { headers: this.getHeaders() });
  }
}
