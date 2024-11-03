import { HttpClient } from "@angular/common/http";
import { NhomLop } from "../models";
import { CRUDService } from "./CRUD.service.interface";
import { ApiResponse } from "../models/ApiResponse.interface";
import { Observable } from "rxjs";
import { Injectable } from "@angular/core";

@Injectable({ providedIn: 'root' })

export class NhomLopService implements CRUDService<NhomLop> {
  private apiUrl: string = "https://localhost:8080/api/v1/nhom-lop";
  constructor(private httpClient: HttpClient) { }

  getHeaders() {
    const token = "eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJhZG1pbiIsImlhdCI6MTczMDY0MTQ1NiwiZXhwIjoxNzMwNzI3ODU2fQ.NVOj-GLg64OfEix-uXYgUrwV0CivgJiaxWn1iRs0aRE";
    return {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    };
  }

  getAll(): Observable<ApiResponse<NhomLop[]>> {
    return this.httpClient.get<ApiResponse<NhomLop[]>>(this.apiUrl, { headers: this.getHeaders() });
  }

  get(id: number): Observable<ApiResponse<NhomLop>> {
    return this.httpClient.get<ApiResponse<NhomLop>>(`${this.apiUrl}/${id}`, { headers: this.getHeaders() });
  }

  add(entity: NhomLop): Observable<ApiResponse<NhomLop>> {
    return this.httpClient.post<ApiResponse<NhomLop>>(this.apiUrl, entity, { headers: this.getHeaders() });
  }

  update(entity: NhomLop): Observable<ApiResponse<NhomLop>> {
    return this.httpClient.put<ApiResponse<NhomLop>>(this.apiUrl, entity, { headers: this.getHeaders() });
  }

  delete(id: number): Observable<ApiResponse<string | null>> {
    return this.httpClient.delete<ApiResponse<string | null>>(`${this.apiUrl}/${id}`, { headers: this.getHeaders() });
  }
}
