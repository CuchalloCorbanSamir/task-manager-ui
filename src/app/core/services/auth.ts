import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

import { LoginRequest } from '../models/login-request.model';
import { LoginResponse } from '../models/login-response.model';

import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class Auth {

  private apiUrl =
    `${environment.apiUrl}/auth`;

  constructor(
    private http: HttpClient
  ) {}

  login(
    request: LoginRequest
  ): Observable<LoginResponse> {

    return this.http.post<LoginResponse>(
      `${this.apiUrl}/login`,
      request
    );
  }
  saveTokens(
    accessToken: string,
    refreshToken: string
  ): void {

    localStorage.setItem(
      'accessToken',
      accessToken
    );

    localStorage.setItem(
      'refreshToken',
      refreshToken
    );
  }

  getAccessToken(): string | null {

    return localStorage.getItem(
      'accessToken'
    );
  }

  logout(): void {

    localStorage.removeItem(
      'accessToken'
    );

    localStorage.removeItem(
      'refreshToken'
    );
  }
}