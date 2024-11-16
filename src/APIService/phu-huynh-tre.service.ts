import { PhuHuynhTre } from './../models';
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { } from '../models';
import { CRUDService } from './interfaces/CRUD.service.interface';
import { access_token } from '../constants/test_api';
import TokenService from './interfaces/token-service.interface';

@Injectable({
  providedIn: 'root'
})

export class PhuHuynhTreService extends TokenService implements CRUDService<PhuHuynhTre> {
  private apiUrl = 'http://localhost:8080/api/v1/phuhuynhtre';


  constructor(protected http: HttpClient) {
    super();
  }

  getAll(): Observable<PhuHuynhTre[]> {
    return this.http.get<PhuHuynhTre[]>(this.apiUrl, { headers: this.getAuthorization() });
  }

  get(id: number): Observable<PhuHuynhTre> {
    return this.http.get<PhuHuynhTre>(`${this.apiUrl}/${id}`, { headers: this.getAuthorization() });
  }

  add(item: PhuHuynhTre): Observable<PhuHuynhTre> {
    return this.http.post<PhuHuynhTre>(this.apiUrl, item, { headers: this.getAuthorization() });
  }

  update(item: PhuHuynhTre): Observable<PhuHuynhTre> {
    return this.http.put<PhuHuynhTre>(`${this.apiUrl}/${item.id}`, item, { headers: this.getAuthorization() });
  }

  delete(id: number): Observable<string | null> {
    return this.http.delete<string | null>(`${this.apiUrl}/${id}`, { headers: this.getAuthorization() });
  }
}
