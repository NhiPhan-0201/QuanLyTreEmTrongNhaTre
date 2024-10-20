import { Observable } from "rxjs";

export interface CRUDService<Type> {
    getAll(): Observable<Type[]>;

    get(id: number): Observable<Type>;

    add(t: Type): Observable<Type>;

    update(t: Type): Observable<Type>;

    delete(id: number): Observable<Type>;
}