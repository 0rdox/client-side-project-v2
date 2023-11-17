import { Observable, of, throwError } from 'rxjs';
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



    public createUser(user: ICreateUser | null): Observable<boolean> {
        if (user == null) {
            return of(false);
        }

        //LASTUSER
        const lastUser = this.users$.value[this.users$.value.length - 1];

        // Create a new user object with the provided properties
        const newUser: IUser = {
            id: String(Number(lastUser.id) + 1),
            name: user.name,
            email: user.email,
            password: user.password,
        };

        this.users$.next([...this.users$.value, newUser]);
        return of(true);
    }

    public updateUser(user: IUser | null): Observable<void> {
        console.log("Updating User", "TAG");
        console.log(user, "TAG");

        if (user == null) {
            return of(undefined);
        }

        // remove the old user
        const userList = this.users$.value;
        console.log(userList, "UserList");

        const index = userList.findIndex((u) => u.id === user.id);

        console.log(index, "Index");
        if (index !== -1) {
            userList.splice(index, 1);
        }

        // add the updated user
        this.users$.next([...userList, user]);
        return of(undefined);
    }

    public removeUser(id: string | null): void {
        if (id == null) {
            return;
        }

        const userList = this.users$.value;
        const index = userList.findIndex((user) => user.id === id);

        if (index !== -1) {
           userList.splice(index, 1)[0];
        }
    }

    public resetArray(): void {
        const initialUsers: IUser[] = [
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
        this.users$.next(initialUsers);
    }
    /**
     * Handle errors.
     */
    public handleError(error: HttpErrorResponse): Observable<any> {
        console.log('handleError in UserService', error);

        return throwError(() => new Error(error.message));
    }
}

