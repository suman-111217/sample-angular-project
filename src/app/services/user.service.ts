import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, map } from 'rxjs';
import { User, ApiResponse } from '../models/user.model';

@Injectable({ providedIn: 'root' })
export class UserService {
  private baseUrl = 'http://localhost:3000/users'; // change this to your backend

  constructor(private http: HttpClient) {}

  getUsers(): Observable<User[]> {
    return this.http.get<ApiResponse>(this.baseUrl).pipe(
      map(response => response.data as User[])
    );
  }

  getUser(id: string): Observable<User> {
    return this.http.get<ApiResponse>(`${this.baseUrl}/${id}`).pipe(
      map(response => (response.data as User))
    );
  }

  createUser(data: any): Observable<any> {
    return this.http.post<ApiResponse>(this.baseUrl, data).pipe(
      map(response => response.data)
    );
  }

  updateUser(id: string, data: any): Observable<any> {
    return this.http.patch<ApiResponse>(`${this.baseUrl}/${id}`, data).pipe(
      map(response => response.data)
    );
  }

  deleteUser(id: string): Observable<ApiResponse> {
    return this.http.delete<ApiResponse>(`${this.baseUrl}/${id}`)
  }
}
