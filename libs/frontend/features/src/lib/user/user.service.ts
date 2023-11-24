import { Observable, of, throwError } from 'rxjs';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { map, catchError, tap } from 'rxjs/operators';
import {
  ApiResponse,
  IUser,
  ICreateUser,
} from '@client-side-project/shared/api';
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { environment } from '@client-side-project/shared/util-env';

export const httpOptions = {
  observe: 'body',
  responseType: 'json',
};

@Injectable()
export class UserService {
    endpoint = environment.dataApiUrl + '/user';

  private users$ = new BehaviorSubject<IUser[]>([]);

  constructor(private readonly http: HttpClient) {}

  public list(options?: any): Observable<IUser[] | null> {
    return this.http
      .get<ApiResponse<IUser[]>>(this.endpoint, {
        ...options,
        ...httpOptions,
      })
      .pipe(
        map((response: any) => response.results as IUser[]),
        tap(console.log),
        catchError(this.handleError)
      );
  }

  public read(id: string | null, options?: any): Observable<IUser> {
    return this.http
      .get<ApiResponse<IUser>>(`${this.endpoint}/${id}`, {
        ...options,
        ...httpOptions,
      })
      .pipe(
        tap(console.log),
        map((response: any) => response.results as IUser),
        catchError(this.handleError)
      );
  }

  public createUser(user: IUser, options?: any): Observable<boolean> {
    return this.http
      .post<ApiResponse<IUser>>(`${this.endpoint}`, user, {
        ...options,
        ...httpOptions,
      })
      .pipe(
        tap(console.log),
        map((response: any) => response.results),
        catchError(this.handleError)
      );
  }

  public updateUser(user: IUser, options?: any): Observable<void> {
    return this.http
      .put<ApiResponse<IUser>>(`${this.endpoint}/${user.id}`, user, {
        ...options,
        ...httpOptions,
      })
      .pipe(
        tap(console.log),
        map((response: any) => response.results),
        catchError(this.handleError)
      );
  }

  public removeUser(id: string, options?: any): Observable<void> {
    console.log('DELETE USER');

    return this.http
      .delete(`${this.endpoint}/${id}`, {
        ...options,
        ...httpOptions,
      })
      .pipe(
        tap(console.log),
        map((response: any) => response.result),
        catchError(this.handleError)
      );
  }

 

  public handleError(error: HttpErrorResponse): Observable<any> {
    return throwError(() => new Error(error.message));
  }
}
