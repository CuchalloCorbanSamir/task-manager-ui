import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  isAuthenticated(): boolean {

    const token =
      localStorage.getItem('accessToken');

    return !!token;
  }

  logout(): void {

    localStorage.removeItem('accessToken');
    localStorage.removeItem('refreshToken');

  }

}