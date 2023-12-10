import { Observable, of, throwError } from 'rxjs';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { map, catchError, tap } from 'rxjs/operators';
import {
  ApiResponse,
  IUser,
  ICreateUser,
  IUserCredentials,
} from '@client-side-project/shared/api';
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { environment } from '@client-side-project/shared/util-env';
import { OperatorFunction } from 'rxjs';



const user = localStorage.getItem('user');
const userString = user ? JSON.parse(user) : undefined;
const token = localStorage.getItem('token');




export const httpOptions = {
  observe: 'body',
  responseType: 'json',
  headers: {
    'Content-Type': 'application/json',
    Authorization: `Bearer ${token}`,
  },
};



@Injectable()
export class UserService {
  endpoint = environment.dataApiUrl + '/user';

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

  public getRecommendations(id: string, options?:any): Observable<any> {
    return this.http
      .get<ApiResponse<IUser>>(`${this.endpoint}/${id}/friend/recommendation`, {
        ...options,
        ...httpOptions,
      })
      .pipe(
        tap(console.log),
        map((response: any) => response.results),
        catchError(this.handleError)
      );
  }



  public addFriend(user: IUser, friendId: string, options?: any): Observable<void> {
    console.log(httpOptions.headers.Authorization, "TOKEN");

    const updatedOptions = {
      ...httpOptions,
      observe: 'body' as const,
      responseType: 'json' as const,
    };

    return this.http
      .post<ApiResponse<IUser>>(`${this.endpoint}/${user._id}/friend/${friendId}`, options, updatedOptions)
      .pipe(
        tap(console.log),
        map((response: any) => response.results),
        catchError(this.handleError)
      );
  }

  public getFriends(userId: string, options?: any): Observable<string[]> {
    return this.http
      .get<ApiResponse<IUser[]>>(`${this.endpoint}/${userId}/friend`, {
        ...options,
        ...httpOptions,
      })
      .pipe(
        tap(console.log),
        map((response: any) => response.results),
        catchError(this.handleError)
      );
  }

  public login(user: IUserCredentials, options?: any): Observable<IUser> {
    return this.http
      .post<ApiResponse<IUser>>(`${environment.dataApiUrl}/auth/login`, user, {
        ...options,
        ...httpOptions,
      })
      .pipe(
        tap(console.log),
        map((response: ApiResponse<IUser>) => response.results as IUser),
        catchError(this.handleError)
      );
  }
  public register(user: IUser, options?: any): Observable<boolean> {
    return this.http
      .post<ApiResponse<IUser>>(
        `${environment.dataApiUrl}/auth/register`,
        user,
        {
          ...options,
          ...httpOptions,
        }
      )
      .pipe(
        tap(console.log),
        map((response: any) => response.results),
        catchError(this.handleError)
      );
  }
  public updateUser(user: IUser, options?: any): Observable<void> {
    return this.http
      .put<ApiResponse<IUser>>(`${this.endpoint}/${user._id}`, user, {
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
    console.log(`delete ${this.endpoint}/${id}`);
    


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


  // getHttpOptions() {
  //   const user = localStorage.getItem('user');
  //   const userString = user ? JSON.parse(user) : undefined;
  
  //   return {
  //     observe: 'body',
  //     responseType: 'json',
  //     headers: {
  //       'Content-Type': 'application/json',
  //       Authorization: `Bearer ${userString?.token}`,
  //     },
  //   };
  // }
}

