import { Observable, of, throwError } from 'rxjs';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { map, catchError, tap } from 'rxjs/operators';
import { ApiResponse, ArtworkType, IArtwork, ICreateArtwork } from '@client-side-project/shared/api';
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { environment } from "@client-side-project/shared/util-env";


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
export class ArtworkService {
    private endpoint = environment.dataApiUrl + '/artwork';
    private artworks$ = new BehaviorSubject<IArtwork[]>([]);

    constructor(private readonly http: HttpClient) {}

    public list(options?: any): Observable<IArtwork[] | null> {
        console.log(`list ${this.endpoint}`);
        return this.http
            .get<ApiResponse<IArtwork[]>>(this.endpoint, {
                ...options,
                ...httpOptions,
            })
            .pipe(
                map((response: any) => response.results as IArtwork[]),
                tap(console.log),
                catchError(this.handleError)
            );
    }

    public read(id: string | null, options?: any): Observable<IArtwork> {
        console.log(`read ${this.endpoint}/${id}`);
        return this.http
            .get<ApiResponse<IArtwork>>(`${this.endpoint}/${id}`, {
                ...options,
                ...httpOptions,
            })
            .pipe(
                tap(console.log),
                map((response: any) => response.results as IArtwork),
                catchError(this.handleError)
            );
    }

    public createArtwork(artwork: ICreateArtwork | null): Observable<boolean> {
        console.log("CREATE Artwork CLICKED", "TAG");
        if (artwork == null) {
            return of(false);
        }
        const lastArtwork = this.artworks$.value[this.artworks$.value.length - 1];
        const newArtwork: IArtwork = {
            id: String(Number(lastArtwork.id) + 1),
            title: '',
            description: '',
            type: ArtworkType.painting,
            creationDate: new Date(),
            image: '',
            user: null
        };
        this.artworks$.next([...this.artworks$.value, newArtwork]);
        return of(true);
    }

    public updateArtwork(artwork: IArtwork, options?: any): Observable<IArtwork> {
        console.log(artwork, "artwork in artworkService");
        return this.http
            .put<ApiResponse<IArtwork>>(`${this.endpoint}/${artwork.id}`, artwork, {
                ...options,
                ...httpOptions,
            })
            .pipe(
                tap(console.log),
                map((response: any) => response.results),
                catchError(this.handleError)
            );
    }

    public removeArtwork(id: string, options?: any): Observable<void> {
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
        console.log('handleError in artworkService', error);
        return throwError(() => new Error(error.message));
    }
}
