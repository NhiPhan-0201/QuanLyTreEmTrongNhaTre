import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Account } from '../model/account';

@Injectable({
    providedIn: 'root'
})
export class AccountService {
    private apiUrl = 'http://localhost:8080/api/v1/account';
    constructor(private http: HttpClient) { }

    getAccounts(): Observable<Account[]> {
        return this.http.get<Account[]>(this.apiUrl);
    }

    addAccount(account: Account): Observable<Account> {
        return this.http.post<Account>(this.apiUrl, account);
    }

    updateAccount(id: number, account: Account): Observable<Account> {
        return this.http.put<Account>(`${this.apiUrl}/${id}`, account);
    }

    deleteAccount(id: number): Observable<Account> {
        return this.http.delete<Account>(`${this.apiUrl}/${id}`);
    }
}
