import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { catchError } from 'rxjs/operators';

interface ThongBao {
  id: number;
  tieuDe: string;
  noiDung: string;
  loaiThongBao: string;
}

@Injectable({
  providedIn: 'root'
})

export class XemthongbaoService {
    private apiUrl = 'http://localhost:8080/api/v1/thong-bao-truong/lay-tat-ca';

    // Token mặc định cung cấp trực tiếp
    private defaultToken = 'eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJuZ3V5ZW50aGlhbiIsImlhdCI6MTczMDYyMTY0MSwiZXhwIjoxNzMwNzA4MDQxfQ.AaMSesrsprgUdBcRJzOajLfD8Xg40ojry_QjTbx3uPg';

    // Dữ liệu mẫu để hiển thị khi không thể gọi API
    private sampleData: ThongBao[] = [
        {
        id: 1,
        tieuDe: 'Thông báo khai giảng năm học mới',
        noiDung: 'Lễ khai giảng năm học 2024-2025 sẽ diễn ra vào ngày 05/09/2024. Đề nghị tất cả học sinh mặc đồng phục.',
        loaiThongBao: 'TRUONG'
        },
        {
        id: 2,
        tieuDe: 'Thông báo họp phụ huynh',
        noiDung: 'Phụ huynh của các em sẽ có cuộc họp vào ngày 25/09/2024 tại lớp.',
        loaiThongBao: 'TRUONG'
        },
        {
        id: 3,
        tieuDe: 'Thông báo kỳ thi giữa kỳ',
        noiDung: 'Kỳ thi giữa kỳ sẽ diễn ra vào tuần sau. Học sinh cần chuẩn bị kỹ lưỡng.',
        loaiThongBao: 'LOP'
        }
    ];

    constructor(private http: HttpClient) {}
  
    private getHeaders(): HttpHeaders {
        let token = this.defaultToken;
        if (typeof window !== 'undefined' && localStorage.getItem('AccessToken')) {
            token = localStorage.getItem('AccessToken')!;
        }
        return new HttpHeaders({
            'Authorization': `Bearer ${token}`
        });
    }

    getThongBao(): Observable<ThongBao[]> {
        const headers = this.getHeaders();
        return this.http.get<ThongBao[]>(this.apiUrl, { headers }).pipe(
            catchError(() => {
                console.warn('API không khả dụng. Sử dụng dữ liệu mẫu để hiển thị.');
                return of(this.sampleData); // Trả về dữ liệu mẫu nếu gặp lỗi
            })
        );
    }
}
