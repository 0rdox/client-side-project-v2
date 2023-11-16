import { Observable, throwError } from 'rxjs';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { map, catchError, tap } from 'rxjs/operators';
import { ApiResponse, IUser, ICreateUser } from '@client-side-project/shared/api';
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';


/**
 * See https://angular.io/guide/http#requesting-data-from-a-server
 */
export const httpOptions = {
    observe: 'body',
    responseType: 'json',
};


/**
 *
 *
 */
@Injectable()
export class UserService {
    endpoint = 'http://localhost:3000/api/user';

private users$ = new BehaviorSubject<IUser[]>([]);


    constructor(private readonly http: HttpClient) {

        const users: IUser[] =[
            {
                id: '0',
              name: 'John Smith',
              email: 'j.smith@mail.com',
              password: 'Secret123'
            },
            {
                id: '1',
                name: 'Katie Smith',
                email: 'k.smith@mail.com',
                password: 'Secret123'
            }
        ];
        
        this.users$.next([...this.users$.value, ...users]);

    }

    /**
     * Get all items.
     *
     * @options options - optional URL queryparam options
     */
    public list(options?: any): Observable<IUser[] | null> {
        // console.log(`list ${this.endpoint}`);

        // return this.http
        //     .get<ApiResponse<IUser[]>>(this.endpoint, {
        //         ...options,
        //         ...httpOptions,
        //     })
        //     .pipe(
        //         map((response: any) => response.results as IUser[]),
        //         tap(console.log),
        //         catchError(this.handleError)
        //     );

        return this.users$;
    }

    /**
     * Get a single item from the service.
     *
     */
    public read(id: string | null, options?: any): Observable<IUser> {
        console.log(`read ${this.endpoint}/${id}`);
        // return this.http
        //     .get<ApiResponse<IUser>>(`${this.endpoint}/${id}`,  {
        //         ...options,
        //         ...httpOptions,
        //     })
        //     .pipe(
        //         tap(console.log),
        //         map((response: any) => response.results as IUser),
        //         catchError(this.handleError)
        //     );
        return this.users$.pipe(
            map((userList) => userList.find((user) => user.id === id)),
        ) as Observable<IUser>;
    }



    public createUser(user : IUser | null) : boolean{
        if (user == null) {
            return false;
        }

        //TODO: random ID geration

        //random id of oplopend
        user.id = "randomGetal"

        this.users$.next([...this.users$.value, user]);
        return true;
    }


    public updateUser(user : IUser | null) : void {
        if (user == null) {
            return;
        }

        //delete
        this.removeUser(user);

        //create
        this.users$.next([...this.users$.value, user]);
      
    
    }

    public removeUser(user : IUser | null) : void {
        if (user == null) {
            return;
        }

        // //delete
        // this.users$.forEach((user, index) => {
        //     if (item === data) { roomArr.splice(index, 1); }
        //   });
    
    
    }

    /**
     * Handle errors.
     */
    public handleError(error: HttpErrorResponse): Observable<any> {
        console.log('handleError in UserService', error);

        return throwError(() => new Error(error.message));
    }
}
