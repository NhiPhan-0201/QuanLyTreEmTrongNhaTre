import { HttpClient, HttpErrorResponse, HttpHeaders } from "@angular/common/http";
import { Observable, of } from "rxjs";
import { catchError, switchMap } from "rxjs/operators";

export default class AutoRevokeService {
  http!: MyCustomHttp;

  constructor(protected httpClient: HttpClient) {
    this.http = new MyCustomHttp(httpClient);
  }

  protected getAuthorization() {
    return this.http.getAuthorization();
  }
}

const methods = {
  get: "GET",
  post: "POST",
  put: "PUT",
  delete: "DELETE",
}

class MyCustomHttp {
  constructor(private http: HttpClient) { }

  getAuthorization() {
    if (typeof localStorage === "undefined" || !localStorage.getItem("access_token")) {
      return;
    }
    const token = localStorage.getItem("access_token");
    return {
      Authorization: `Bearer ${token}`,
    };
  }

  getRevokeToken() {
    if (typeof localStorage === "undefined" || !localStorage.getItem("refresh_token")) {
      return;
    }
    const refresh_token = localStorage.getItem("refresh_token");
    return {
      Authorization: `Bearer ${refresh_token}`,
    };
  }

  revokeToken(): Observable<any> {
    const headers = new HttpHeaders(this.getRevokeToken());
    return this.post<any>("/api/v1/auth/refresh-token", null, { headers });
  }

  get<T>(url: string, options: { headers?: any; params?: any; observe?: 'body'; responseType?: 'json' } = {}): Observable<T> {
    options.observe = "body";
    if (!options.headers) {
      options.headers = this.getAuthorization();
    }
    return this.http.get<T>(url, options).pipe<T>(
      catchError((error) => this.handleError<T>(error, methods.get, url, options))
    );
  }

  post<T>(url: string, body: any | null, options: { headers?: any; params?: any; observe?: 'body'; responseType?: 'json' } = {}): Observable<T> {
    options.observe = "body";
    if (!options.headers) {
      options.headers = this.getAuthorization();
    }
    return this.http.post<T>(url, body, options).pipe<T>(
      catchError((error) => this.handleError<T>(error, methods.post, url, options, body))
    );
  }

  put<T>(url: string, body: any | null, options: { headers?: any; params?: any; observe?: 'body'; responseType?: 'json' } = {}): Observable<T> {
    options.observe = "body";
    if (!options.headers) {
      options.headers = this.getAuthorization();
    }
    return this.http.put<T>(url, body, options).pipe<T>(
      catchError((error) => this.handleError<T>(error, methods.put, url, options, body))
    );
  }

  delete<T>(url: string, options: { headers?: any; params?: any; observe?: 'body'; responseType?: 'json' } = {}): Observable<T> {
    options.observe = "body";
    if (!options.headers) {
      options.headers = this.getAuthorization();
    }
    return this.http.delete<T>(url, options).pipe<T>(
      catchError((error) => this.handleError<T>(error, methods.delete, url, options))
    );
  }

  private handleError<T>(error: HttpErrorResponse, method: string, url: string, options: any, body: any = null): Observable<T> {
    // Kiểm tra xem lỗi có phải do token hết hạn (401) không
    if (error.status === 401) {
      // Nếu token hết hạn, thực hiện revoke và lấy lại access_token mới
      return this.revokeToken().pipe(
        switchMap((response: any) => {
          // Lưu lại access_token và refresh_token mới vào localStorage
          localStorage.setItem("access_token", response.access_token);
          localStorage.setItem("refresh_token", response.refresh_token);

          // Sau khi lấy token mới, thực hiện lại request ban đầu với token mới
          const newHeaders = new HttpHeaders({
            ...options.headers,
            Authorization: `Bearer ${response.access_token}`,
          });

          // Cập nhật options với headers mới và thử lại request
          const newOptions = { ...options, headers: newHeaders };

          // Gọi lại phương thức HTTP phù hợp (get, post, put, delete) với options mới
          switch (method) {
            case methods.get:
              return this.get<T>(url, newOptions);
            case methods.post:
              return this.post<T>(url, body, newOptions);
            case methods.put:
              return this.put<T>(url, body, newOptions);
            case methods.delete:
              return this.delete<T>(url, newOptions);
            default:
              throw new Error('Unsupported method');
          }
        })
      );
    } else {
      // Nếu không phải lỗi 401, ném lại lỗi gốc
      throw error;
    }
  }
}
