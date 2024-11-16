import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Account } from '../models/Account';
import { CRUDService } from './interfaces/CRUD.service.interface';
import { AccountRole } from '../constants/enums';
import AutoRevokeService from './interfaces/auto-revoke.service.interface';

@Injectable({
  providedIn: 'root'
})
export class AccountService extends AutoRevokeService implements CRUDService<Account> {
  private apiUrl = 'http://localhost:8080/api/v1/admin/account';

  constructor(private _http: HttpClient) {
    super(_http);
  }

  getParents(): Observable<Account[]> {
    return this.http.get<Account[]>(`${this.apiUrl}/parent`);
  }

  getTeachers(): Observable<Account[]> {
    return this.http.get<Account[]>(`${this.apiUrl}/teacher`);
  }
  getAll(): Observable<Account[]> {
    return this.http.get<Account[]>(this.apiUrl);
  }

  get(id: number): Observable<Account> {
    return this.http.get<Account>(`${this.apiUrl}/${id}`);
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
    return this.http.post<Account>(this.apiUrl, formData);
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
    return this.http.put<Account>(`${this.apiUrl}/${account.id}`, formData);
  }

  delete(id: number): Observable<null | string> {
    return this.http.delete<null | string>(`${this.apiUrl}/${id}`);
  }
}
