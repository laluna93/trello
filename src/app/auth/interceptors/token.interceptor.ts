import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpErrorResponse,
} from '@angular/common/http';
import { catchError, Observable, throwError } from 'rxjs';
import { environment } from 'src/environments/environment';
import { ChangeLanguageService } from '../../core/services/changeLanguage.service';
import { StorageKeys } from '../../core/models/project-manager.model';

@Injectable()
export class TokenInterceptor implements HttpInterceptor {
  constructor(private changeLanguageService: ChangeLanguageService) {}

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    const token = this.changeLanguageService.getFromLocalStorage(StorageKeys.Token);

    if (request.url.includes('.json')) {
      return next.handle(request);
    }
    if (!token || request.url.includes('sign')) {
      const replacedUnAuthRequest = request.clone({
        url: `${environment.PATH}${request.url}`,
      });
      return next.handle(replacedUnAuthRequest);
    }

    const replacedAuthRequest = request.clone({
      url: `${environment.PATH}${request.url}`,
      headers: request.headers.set('Authorization', `Bearer ${token}`),
    });
    return next.handle(replacedAuthRequest)
      .pipe(
        catchError((err) => {
          if (err instanceof HttpErrorResponse && err.status === 401) {
            console.warn('token expired');
          }
          return throwError(err);
        }),
      );
  }
}
