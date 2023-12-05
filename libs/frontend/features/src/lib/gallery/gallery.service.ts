import { Observable, of, throwError } from 'rxjs';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { map, catchError, tap } from 'rxjs/operators';
import {
  ApiResponse,
  IGallery,
  ICreateGallery,
} from '@client-side-project/shared/api';
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { environment } from '@client-side-project/shared/util-env';

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
export class GalleryService {
  endpoint = environment.dataApiUrl + '/gallery';

  private galleries$ = new BehaviorSubject<IGallery[]>([]);

  constructor(private readonly http: HttpClient) {}

  /**
   * Get all items.
   *
   * @options options - optional URL queryparam options
   */
  public list(options?: any): Observable<IGallery[] | null> {
    console.log(`list ${this.endpoint}`);

    return this.http
      .get<ApiResponse<IGallery[]>>(this.endpoint, {
        ...options,
        ...httpOptions,
      })
      .pipe(
        map((response: any) => response.results as IGallery[]),
        tap(console.log),
        catchError(this.handleError)
      );
  }

  /**
   * Get a single item from the service.
   *
   */
  public read(id: string | null, options?: any): Observable<IGallery> {
    console.log(`read ${this.endpoint}/${id}`);
    return this.http
      .get<ApiResponse<IGallery>>(`${this.endpoint}/${id}`, {
        ...options,
        ...httpOptions,
      })
      .pipe(
        tap(console.log),
        map((response: any) => response.results as IGallery),
        catchError(this.handleError)
      );
  }

  public createGallery(
    gallery: ICreateGallery,
    options?: any
  ): Observable<boolean> {
    console.log('CREATE gallery CLICKED', 'TAG');
    return this.http
      .post<ApiResponse<IGallery>>(`${this.endpoint}`, gallery, {
        ...options,
        ...httpOptions,
      })
      .pipe(
        tap(console.log),
        map((response: any) => response.results),
        catchError(this.handleError)
      );
  }

  public updateGallery(gallery: IGallery, options?: any): Observable<IGallery> {
    console.log(gallery, 'gallery in galleryService');
    return this.http
      .put<ApiResponse<IGallery>>(`${this.endpoint}/${gallery._id}`, gallery, {
        ...options,
        ...httpOptions,
      })
      .pipe(
        tap(console.log),
        map((response: any) => response.results),
        catchError(this.handleError)
      );
  }

  public removeGallery(id: string, options?: any): Observable<void> {
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

  //   public hasClaimedGallery(userId: string): Observable<boolean> {

  //     }

  /**
   * Handle errors.
   */
  public handleError(error: HttpErrorResponse): Observable<any> {
    console.log('handleError in galleryService', error);

    return throwError(() => new Error(error.message));
  }
}
