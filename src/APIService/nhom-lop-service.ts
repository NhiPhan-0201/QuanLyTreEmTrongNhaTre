import { HttpClient } from "@angular/common/http";
import { NhomLop } from "../models";
import { CRUDService } from "./interfaces/CRUD.service.interface";
import { Observable } from "rxjs";
import { Injectable } from "@angular/core";
import TokenService from "./interfaces/token-service.interface";

@Injectable({ providedIn: 'root' })

export class NhomLopService extends TokenService implements CRUDService<NhomLop> {
  private apiUrl: string = "http://localhost:8080/api/v1/nhom-lop";

  constructor(protected http: HttpClient) {
    super();
  }

  getAll(): Observable<NhomLop[]> {
    return this.http.get<NhomLop[]>(this.apiUrl, { headers: this.getAuthorization() });
  }

  get(id: number): Observable<NhomLop> {
    return this.http.get<NhomLop>(`${this.apiUrl}/${id}`, { headers: this.getAuthorization() });
  }

  add(entity: NhomLop): Observable<NhomLop> {
    return this.http.post<NhomLop>(this.apiUrl, entity, { headers: this.getAuthorization() });
  }

  update(entity: NhomLop): Observable<NhomLop> {
    return this.http.put<NhomLop>(this.apiUrl, entity, { headers: this.getAuthorization() });
  }

  delete(id: number): Observable<string | null> {
    return this.http.delete<string | null>(`${this.apiUrl}/${id}`, { headers: this.getAuthorization() });
  }
}
