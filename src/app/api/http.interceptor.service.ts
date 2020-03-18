import { Injectable } from "@angular/core";
import {
    HttpRequest,
    HttpResponse,
    HttpEvent,
    HttpInterceptor
} from "@angular/common/http";
import * as data from "./data.json";
import { of, Observable, config } from "rxjs";
import ICow from "../cows/ICow";
import { baseURL } from "../cows/cows.service";

@Injectable({
    providedIn: "root"
})
export class HttpInterceptorService implements HttpInterceptor {
    cows: ICow[] = [];
    intercept(request: HttpRequest<any>): Observable<HttpEvent<any>> {
        if (request.url === baseURL) {
            if (!this.cows.length) {
                this.cows = data.result.map((cow, index) => ({
                    id: index + 1,
                    ...cow
                }));
            }
            if (request.method === "GET") {
                if (request.params.has("id")) {
                    const cow = this.cows.find(
                        cow => cow.id === +request.params.get("id")
                    );
                    return of(new HttpResponse({ status: 200, body: cow }));
                }
                return of(new HttpResponse({ status: 200, body: this.cows }));
            }
            if (request.method === "POST") {
                if (!request.body) {
                    return of(
                        new HttpResponse({
                            status: 400,
                            statusText: "Body of the request is missing"
                        })
                    );
                }
                const lastID = this.getLastId(this.cows);
                const newCow = { ...request.body, id: lastID + 1 };
                this.cows.push(newCow);
                return of(
                    new HttpResponse({
                        status: 200,
                        body: newCow
                    })
                );
            }
            if (request.method === "PATCH") {
                if (!request.body) {
                    return of(
                        new HttpResponse({
                            status: 400,
                            statusText: "Body of the request is missing"
                        })
                    );
                }
                const cowToUpdateIndex = this.getCowIndexById(request.body.id);
                if (cowToUpdateIndex === -1) {
                    return of(
                        new HttpResponse({
                            status: 400,
                            statusText: "Could not get cow with given ID"
                        })
                    );
                }
                const updatedCow = {
                    ...this.cows[cowToUpdateIndex],
                    ...request.body
                };
                this.cows[cowToUpdateIndex] = updatedCow;
                return of(
                    new HttpResponse({
                        status: 200,
                        body: updatedCow
                    })
                );
            }
            if (request.method === "DELETE") {
                if (!request.params.get("id")) {
                    return of(
                        new HttpResponse({
                            status: 400,
                            statusText: "Missing param: ID"
                        })
                    );
                }
                const cowToDeleteIndex = this.getCowIndexById(
                    +request.params.get("id")
                );
                if (cowToDeleteIndex !== -1) {
                    this.cows.splice(cowToDeleteIndex, 1);
                }
                // Always returning 204 (no content) on delete, no mater if
                // delete took place or the record was not deleted
                // due to its absense.
                return of(new HttpResponse({ status: 204 }));
            }
        }
    }

    getLastId(cows: ICow[]): number {
        return cows[cows.length - 1].id;
    }

    getCowIndexById(id: number) {
        return this.cows.findIndex(cow => cow.id === id);
    }
}
