import { Observable } from "rxjs";
import { ApiResponse } from "../models/ApiResponse.interface";

export interface CRUDService<Type> {
    getAll(): Observable<ApiResponse<Type[]>>;

    get(id: number): Observable<ApiResponse<Type>>;

    add(t: Type): Observable<ApiResponse<Type>>;

    update(t: Type): Observable<ApiResponse<Type>>;

    delete(id: number): Observable<ApiResponse<Type>>;
}