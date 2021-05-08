import { ActivatedRouteSnapshot, CanActivate, RouterStateSnapshot } from '@angular/router';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { catchError, mapTo } from 'rxjs/operators';
import { RestApiService } from '../services/rest-api.service';
import { AppRouter } from '../services/app-router';

@Injectable({
  providedIn: 'root',
})
export class AuthGuard implements CanActivate {
  constructor(
    private readonly appRouter: AppRouter,
    private readonly restApiService: RestApiService,
  ) {
  }

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean> {
    return this.restApiService.getMe()
      .pipe(
        mapTo(true),
        catchError(() => {
          this.appRouter.saveNavigation('/login');
          return of(false);
        }),
      );
  }
}
