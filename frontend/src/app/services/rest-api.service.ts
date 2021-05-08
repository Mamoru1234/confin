import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class RestApiService {
  constructor(
    private readonly http: HttpClient,
  ) {
  }
  login(data: any): Observable<void> {
    return this.http.post<void>(`${environment.apiUrl}/auth/login`, data, {
      withCredentials: true,
    });
  }
  getMe(): Observable<void> {
    return this.http.get<void>(`${environment.apiUrl}/auth/me`, {
      withCredentials: true,
    });
  }

  logout(): Promise<void> {
    return this.http.post<void>(`${environment.apiUrl}/auth/logout`, {}, {
      withCredentials: true,
    }).toPromise();
  }
}
