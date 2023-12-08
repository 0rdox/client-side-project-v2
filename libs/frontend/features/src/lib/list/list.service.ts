import { Observable, of, throwError } from 'rxjs';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { map, catchError, tap } from 'rxjs/operators';
import { ApiResponse, ListType, IList, ICreateList } from '@client-side-project/shared/api';
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { environment } from "@client-side-project/shared/util-env";


/**
 * See https://angular.io/guide/http#requesting-data-from-a-server
 */
const token = localStorage.getItem('token');

export const httpOptions = {
    observe: 'body',
    responseType: 'json',
    headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
};


/**
 *
 *
 */
@Injectable()
export class ListService {
    private endpoint = environment.dataApiUrl + '/list';
    private lists$ = new BehaviorSubject<IList[]>([]);

    constructor(private readonly http: HttpClient) {}

    public list(options?: any): Observable<IList[] | null> {
        console.log(`list ${this.endpoint}`);
        return this.http
            .get<ApiResponse<IList[]>>(this.endpoint, {
                ...options,
                ...httpOptions,
            })
            .pipe(
                map((response: any) => response.results as IList[]),
                tap(console.log),
                catchError(this.handleError)
            );
    }


public readUserList(userId: string | null, listName: string, options?: any): Observable<IList | null> {
    console.log(`list ${this.endpoint}`);

    return this.listForUser(userId).pipe(
        map((lists: IList[] | null) => {
            console.log(lists, "lists in listService")
            if (lists) {

                console.log(listName, "LISTNAME");
                return lists.find((list: IList) => list.title === listName) || null;
            }
            return null;
        })
    );
    
}


    public listForUser(userId: string | null, options?: any): Observable<IList[] | null> {
        console.log(`list ${this.endpoint}`);
        return this.http
            .get<ApiResponse<IList[]>>(`${this.endpoint}/user/${userId}`, {
                ...options,
                ...httpOptions,
            })
            .pipe(
                map((response: any) => response.results as IList[]),
                tap(console.log),
                catchError(this.handleError)
            );
    }

    
    public read(id: string | null, options?: any): Observable<IList> {
        console.log(`read ${this.endpoint}/${id}`);
        return this.http
            .get<ApiResponse<IList>>(`${this.endpoint}/${id}`, {
                ...options,
                ...httpOptions,
            })
            .pipe(
                tap(console.log),
                map((response: any) => response.results as IList),
                catchError(this.handleError)
            );
    }

    public createList(list: ICreateList, options?: any): Observable<boolean> {
        console.log("CREATE List CLICKED", "TAG");
        return this.http
            .post<ApiResponse<IList>>(`${this.endpoint}`, list, {
                ...options,
                ...httpOptions,
            })
            .pipe(
                tap(console.log),
                map((response: any) => response.results),
                catchError(this.handleError)
            );
    }

    public updateList(list: IList, options?: any): Observable<IList> {
        console.log(list, "list in listService");
        return this.http
            .put<ApiResponse<IList>>(`${this.endpoint}/${list._id}`, list, {
                ...options,
                ...httpOptions,
            })
            .pipe(
                tap(console.log),
                map((response: any) => response.results),
                catchError(this.handleError)
            );
    }

    public removeList(id: string, options?: any): Observable<void> {
        console.log(`delete ${this.endpoint}/${id}`);
        return this.http
            .delete(`${this.endpoint}/${id}`, {
                ...options,
                ...httpOptions
            })
            .pipe(
                tap(console.log),
                map((response: any) => response.result),
                catchError(this.handleError)
            );
    }



    public handleError(error: HttpErrorResponse): Observable<any> {
        console.log('handleError in listService', error);
        return throwError(() => new Error(error.message));
    }
}
