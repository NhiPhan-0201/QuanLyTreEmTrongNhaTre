import { Observable } from "rxjs";
import { ApiResponse } from "../models/ApiResponse.interface";

export interface CRUDService<Type> {
  getAll(): Observable<Type[]>;

  get(id: number): Observable<Type>;

  add(t: Type): Observable<Type>;

  update(t: Type): Observable<Type>;

  delete(id: number): Observable<null | string>;
}
