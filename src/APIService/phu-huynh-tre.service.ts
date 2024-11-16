import { PhuHuynhTre } from './../models';
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { } from '../models';
import { CRUDService } from './interfaces/CRUD.service.interface';
import AutoRevokeService from './interfaces/auto-revoke.service.interface';

@Injectable({
  providedIn: 'root'
})

export class PhuHuynhTreService extends AutoRevokeService implements CRUDService<PhuHuynhTre> {
  private apiUrl = 'http://localhost:8080/api/v1/phuhuynhtre';


  constructor(protected _http: HttpClient) {
    super(_http);
  }

  getAll(): Observable<PhuHuynhTre[]> {
    return this.http.get<PhuHuynhTre[]>(this.apiUrl);
  }

  get(id: number): Observable<PhuHuynhTre> {
    return this.http.get<PhuHuynhTre>(`${this.apiUrl}/${id}`);
  }

  add(item: PhuHuynhTre): Observable<PhuHuynhTre> {
    return this.http.post<PhuHuynhTre>(this.apiUrl, item);
  }

  update(item: PhuHuynhTre): Observable<PhuHuynhTre> {
    return this.http.put<PhuHuynhTre>(`${this.apiUrl}/${item.id}`, item);
  }

  delete(id: number): Observable<string | null> {
    return this.http.delete<string | null>(`${this.apiUrl}/${id}`);
  }
}
