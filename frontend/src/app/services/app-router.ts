import { Injectable } from '@angular/core';
import { ActivatedRoute, NavigationExtras, Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class AppRouter {
  constructor(
    private readonly router: Router,
    private readonly route: ActivatedRoute,
  ) {
  }
  navigate(url: string, extras?: NavigationExtras): void {
    // noinspection JSIgnoredPromiseFromCall
    this.router.navigate([url], extras);
  }
  saveNavigation(url: string): void {
    this.navigate(url, {
      queryParams: {
        redirect: window.location.pathname,
      },
    });
  }
  restoreNavigation(defaultUrl: string): void {
    const redirect = this.route.snapshot.queryParams.redirect;
    const targetUrl = redirect
      ? redirect
      : defaultUrl;
    this.navigate(targetUrl);
  }
}
