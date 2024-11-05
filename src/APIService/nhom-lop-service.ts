import { HttpClient } from "@angular/common/http";
import { NhomLop } from "../models";
import { CRUDService } from "./CRUD.service.interface";
import { Observable } from "rxjs";
import { Injectable } from "@angular/core";

@Injectable({ providedIn: 'root' })

export class NhomLopService implements CRUDService<NhomLop> {
  private apiUrl: string = "https://localhost:8080/api/v1/nhom-lop";
  constructor(private httpClient: HttpClient) { }

  getHeaders() {
    const token = "eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJhZG1pbiIsImlhdCI6MTczMDY0MTQ1NiwiZXhwIjoxNzMwNzI3ODU2fQ.NVOj-GLg64OfEix-uXYgUrwV0CivgJiaxWn1iRs0aRE";
    return {
      'Authorization': `Bearer ${token}`,
    };
  }

  getAll(): Observable<NhomLop[]> {
    return this.httpClient.get<NhomLop[]>(this.apiUrl, { headers: this.getHeaders() });
  }

  get(id: number): Observable<NhomLop> {
    return this.httpClient.get<NhomLop>(`${this.apiUrl}/${id}`, { headers: this.getHeaders() });
  }

  add(entity: NhomLop): Observable<NhomLop> {
    return this.httpClient.post<NhomLop>(this.apiUrl, entity, { headers: this.getHeaders() });
  }

  update(entity: NhomLop): Observable<NhomLop> {
    return this.httpClient.put<NhomLop>(this.apiUrl, entity, { headers: this.getHeaders() });
  }

  delete(id: number): Observable<string | null> {
    return this.httpClient.delete<string | null>(`${this.apiUrl}/${id}`, { headers: this.getHeaders() });
  }
}
