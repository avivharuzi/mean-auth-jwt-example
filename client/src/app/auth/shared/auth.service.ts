import { catchError, delay, mapTo, tap } from 'rxjs/operators';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { of, Observable } from 'rxjs';
import { Router } from '@angular/router';

import { environment } from '../../../environments/environment';
import { Tokens } from './tokens';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private readonly apiUrl = `${environment.baseApiUrl}/auth`;

  private readonly ACCESS_TOKEN = 'ACCESS_TOKEN';
  private readonly REFRESH_TOKEN = 'REFRESH_TOKEN';

  constructor(private http: HttpClient, private router: Router) {
  }

  login(user: { email: string, password: string }): Observable<boolean> {
    return this.http.post<any>(`${this.apiUrl}/login`, user)
      .pipe(
        delay(800),
        tap(tokens => this.doLoginUser(user.email, tokens)),
        mapTo(true),
        catchError(_ => {
          return of(false);
        }),
      );
  }

  logout() {
    return this.http.post<any>(`${this.apiUrl}/logout`, {
      refreshToken: this.getRefreshToken(),
    }).pipe(
      tap(() => this.doLogoutUser()),
      mapTo(true),
      catchError(_ => {
        return of(false);
      }),
    );
  }

  isLoggedIn() {
    return !!this.getAccessToken();
  }

  refreshToken() {
    return this.http.post<any>(`${this.apiUrl}/refresh`, {
      refreshToken: this.getRefreshToken(),
      email: this.getEmail(),
    }).pipe(tap((tokens: Tokens) => {
      this.storeAccessToken(tokens.accessToken);
    }));
  }

  getAccessToken() {
    return localStorage.getItem(this.ACCESS_TOKEN);
  }

  getEmail() {
    return localStorage.getItem('EMAIL');
  }

  private doLoginUser(email: string, tokens: Tokens) {
    localStorage.setItem('EMAIL', email);
    this.storeTokens(tokens);
  }

  private doLogoutUser() {
    localStorage.removeItem('EMAIL');
    this.removeTokens();
    this.router.navigate(['/']).then();
  }

  private getRefreshToken() {
    return localStorage.getItem(this.REFRESH_TOKEN);
  }

  private storeAccessToken(accessToken: string) {
    localStorage.setItem(this.ACCESS_TOKEN, accessToken);
  }

  private storeTokens(tokens: Tokens) {
    localStorage.setItem(this.ACCESS_TOKEN, tokens.accessToken);
    localStorage.setItem(this.REFRESH_TOKEN, tokens.refreshToken);
  }

  private removeTokens() {
    localStorage.removeItem(this.ACCESS_TOKEN);
    localStorage.removeItem(this.REFRESH_TOKEN);
  }
}
