import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import AutoRevokeService from './interfaces/auto-revoke.service.interface';

@Injectable({
  providedIn: 'root'
})
export class UploadService extends AutoRevokeService {
  private apiUrl = 'http://localhost:8080/api/v1/upload';

  constructor(private _http: HttpClient) {
    super(_http);
  }

  // Upload file
  uploadImage(file: File): Observable<{ link: string }> {
    const formData = new FormData();
    formData.append('file', file);
    console.log('uploading image');

    return this.http.post<{ link: string }>(`${this.apiUrl}/image`, formData);
  }
}
