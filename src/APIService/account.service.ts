import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Account } from '../model/account';
import { CRUDService } from './CRUD.service.interface';

@Injectable({
    providedIn: 'root'
})
export class AccountService implements CRUDService<Account> {
    private apiUrl = 'http://localhost:8080/api/v1/account';
    constructor(private http: HttpClient) { }

    getAll(): Observable<Account[]> {
        return this.http.get<Account[]>(this.apiUrl);
    }

    get(id: number): Observable<Account> {
        return this.http.get<Account>(`${this.apiUrl}/${id}`);
    }

    add(account: Account): Observable<Account> {
        return this.http.post<Account>(this.apiUrl, account);
    }

    update(account: Account): Observable<Account> {
        return this.http.put<Account>(`${this.apiUrl}`, account);
    }

    delete(id: number): Observable<Account> {
        return this.http.delete<Account>(`${this.apiUrl}/${id}`);
    }
}
