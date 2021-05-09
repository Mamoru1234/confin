import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { ExpenseResponse, TagResponse } from './rest-api.dto';

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

  addExpense(data: any): Observable<any> {
    return this.http.post(`${environment.apiUrl}/outcome/`, data, {
      withCredentials: true,
    });
  }

  listExpenses(search: any): Observable<ExpenseResponse[]> {
    return this.http.get<ExpenseResponse[]>(`${environment.apiUrl}/outcome/list`, {
      withCredentials: true,
      params: search,
    });
  }

  getAllTags(): Observable<TagResponse[]> {
    return this.http.get<TagResponse[]>(`${environment.apiUrl}/outcome-tag/list`, {
      withCredentials: true,
    });
  }

  createTag(data: any): Observable<void> {
    return this.http.post<void>(`${environment.apiUrl}/outcome-tag`, data, {
      withCredentials: true,
    });
  }
}
