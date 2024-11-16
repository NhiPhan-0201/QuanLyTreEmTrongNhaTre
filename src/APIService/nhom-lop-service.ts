import { HttpClient } from "@angular/common/http";
import { NhomLop } from "../models";
import { CRUDService } from "./interfaces/CRUD.service.interface";
import { Observable } from "rxjs";
import { Injectable } from "@angular/core";
import AutoRevokeService from "./interfaces/auto-revoke.service.interface";

@Injectable({ providedIn: 'root' })

export class NhomLopService extends AutoRevokeService implements CRUDService<NhomLop> {
  private apiUrl: string = "http://localhost:8080/api/v1/nhom-lop";

  constructor(protected _http: HttpClient) {
    super(_http);
  }

  getAll(): Observable<NhomLop[]> {
    return this.http.get<NhomLop[]>(this.apiUrl);
  }

  get(id: number): Observable<NhomLop> {
    return this.http.get<NhomLop>(`${this.apiUrl}/${id}`);
  }

  add(entity: NhomLop): Observable<NhomLop> {
    return this.http.post<NhomLop>(this.apiUrl, entity);
  }

  update(entity: NhomLop): Observable<NhomLop> {
    return this.http.put<NhomLop>(this.apiUrl, entity);
  }

  delete(id: number): Observable<string | null> {
    return this.http.delete<string | null>(`${this.apiUrl}/${id}`);
  }
}
