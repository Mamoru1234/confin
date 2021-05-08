import { Injectable, OnDestroy } from '@angular/core';

import { catchError, finalize, map, takeUntil } from 'rxjs/operators';
import { BehaviorSubject, Observable, Subject, throwError } from 'rxjs';

export enum FetchStatus {
  INIT = 'INIT',
  LOADED = 'LOADED',
  'IN_PROGRESS' = 'IN_PROGRESS',
}

export class FetchWrapper {
  public destroy$ = new Subject();
  public error$ = new BehaviorSubject<any>(null);
  public fetchStatus$ = new BehaviorSubject<FetchStatus>(FetchStatus.INIT);
  isInStatus(status: FetchStatus): Observable<boolean> {
    return this.fetchStatus$.pipe(map(currentStatus => currentStatus === status));
  }
  isInStatuses(...statuses: FetchStatus[]): Observable<boolean> {
    return this.fetchStatus$.pipe(map(currentStatus => statuses.includes(currentStatus)));
  }
  fetch<T>(call: Observable<T>): Observable<T> {
    this.fetchStatus$.next(FetchStatus.IN_PROGRESS);
    this.error$.next(null);
    return call.pipe(
      finalize(() => this.fetchStatus$.next(FetchStatus.LOADED)),
      catchError(e => {
        this.error$.next(e);
        return throwError(e);
      }),
      takeUntil(this.destroy$),
    );
  }
  destroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }
}

@Injectable()
export class FetchService implements OnDestroy {
  private childWrappers: FetchWrapper[] = [];

  static httpErrorMapper(e: any): any {
    return e ? e.error : e;
  }

  createWrapper(): FetchWrapper {
    const wrapper = new FetchWrapper();
    this.childWrappers.push(wrapper);
    return wrapper;
  }

  ngOnDestroy(): void {
    for (const wrapper of this.childWrappers) {
      wrapper.destroy();
    }
    this.childWrappers = [];
  }

  destroyWrapper(wrapper: FetchWrapper): void {
    this.childWrappers = this.childWrappers.filter(it => it !== wrapper);
    wrapper.destroy();
  }
}
