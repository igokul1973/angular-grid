import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Observable, of } from "rxjs";
import { tap, catchError } from "rxjs/operators";
import ICow from "./ICow";

export const baseURL = "http://localhost:5000/api/cows";

@Injectable({
    providedIn: "root"
})
export class CowsService {
    constructor(private http: HttpClient) {}

    getCows(): Observable<ICow[]> {
        return this.http
            .get<ICow[]>(baseURL)
            .pipe(catchError(this.handleError<ICow[]>("postCow", [])));
    }

    getCow(id: number): Observable<ICow> {
        return this.http
            .get<ICow>(baseURL, {
                params: { id: String(id) }
            })
            .pipe(catchError(this.handleError<ICow>("getCow", null)));
    }

    postCow(cow: ICow): Observable<ICow> {
        return this.http
            .post<ICow>(baseURL, cow)
            .pipe(catchError(this.handleError<ICow>("postCow", null)));
    }

    patchCow(cow: ICow): Observable<ICow> {
        return this.http
            .patch<ICow>(baseURL, cow)
            .pipe(catchError(this.handleError<ICow>("patchCow", null)));
    }

    deleteCow(id: number): Observable<ICow> {
        return this.http
            .delete<ICow>(baseURL, {
                params: { id: String(id) }
            })
            .pipe(catchError(this.handleError<ICow>("deleteCow", null)));
    }

    /**
     * Handle Http operation that failed.
     * Let the app continue.
     * @param operation - name of the operation that failed
     * @param result - optional value to return as the observable result
     */
    private handleError<T>(operation = "operation", result?: T) {
        return (error: any): Observable<T> => {
            // TODO: better job of transforming error for user consumption
            this.log(`${operation} failed: ${error.message}`);

            // Let the app keep running by returning an empty result.
            return of(result as T);
        };
    }
    /** Log a HeroService message with the MessageService */
    private log(message: string) {
        // TODO: send the error to remote logging infrastructure
        console.error(message); // log to console instead
    }
}
