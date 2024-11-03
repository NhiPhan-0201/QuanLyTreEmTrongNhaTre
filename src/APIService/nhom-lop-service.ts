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

  getAll(): Observable<ApiResponse<NhomLop[]>> {
    return this.httpClient.get<ApiResponse<NhomLop[]>>(this.apiUrl);
  }

  get(id: number): Observable<ApiResponse<NhomLop>> {
    return this.httpClient.get<ApiResponse<NhomLop>>(`${this.apiUrl}/${id}`);
  }

  add(entity: NhomLop): Observable<ApiResponse<NhomLop>> {
    return this.httpClient.post<ApiResponse<NhomLop>>(this.apiUrl, entity);
  }

  update(entity: NhomLop): Observable<ApiResponse<NhomLop>> {
    return this.httpClient.put<ApiResponse<NhomLop>>(this.apiUrl, entity);
  }

  delete(id: number): Observable<ApiResponse<string | null>> {
    return this.httpClient.delete<ApiResponse<string | null>>(`${this.apiUrl}/${id}`);
  }
}
