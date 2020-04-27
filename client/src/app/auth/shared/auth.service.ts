import { catchError, delay, mapTo, tap } from 'rxjs/operators';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { of, Observable } from 'rxjs';
import { Router } from '@angular/router';

import { environment } from '../../../environments/environment';
import { LoginBody } from './login-body';
import { Tokens } from './tokens';
import { SignupBody } from './signup-body';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private readonly apiUrl = `${environment.baseApiUrl}/auth`;

  private readonly ITEM_ACCESS_TOKEN = 'ACCESS_TOKEN';
  private readonly ITEM_REFRESH_TOKEN = 'REFRESH_TOKEN';
  private readonly ITEM_EMAIL = 'EMAIL';

  constructor(
    private http: HttpClient,
    private router: Router,
  ) {
  }

  signup(body: SignupBody): Observable<void> {
    return this.http.post<void>(`${this.apiUrl}/signup`, body)
      .pipe(
        delay(800),
      );
  }

  login(body: LoginBody): Observable<Tokens> {
    return this.http.post<Tokens>(`${this.apiUrl}/login`, body)
      .pipe(
        delay(800),
        tap(tokens => this.doLoginUser(body.email, tokens)),
      );
  }

  logout(): Observable<boolean> {
    return this.http.post<void>(`${this.apiUrl}/logout`, {
      refreshToken: this.getRefreshToken(),
    }).pipe(
      tap(() => this.doLogoutUser()),
      mapTo(true),
      catchError(_ => {
        return of(false);
      }),
    );
  }

  isLoggedIn(): boolean {
    return !!this.getAccessToken();
  }

  refreshToken(): Observable<Tokens> {
    return this.http.post<Tokens>(`${this.apiUrl}/refresh`, {
      refreshToken: this.getRefreshToken(),
      email: this.getEmail(),
    }).pipe(tap(tokens => {
      this.storeAccessToken(tokens.accessToken);
    }));
  }

  getAccessToken(): string {
    return localStorage.getItem(this.ITEM_ACCESS_TOKEN);
  }

  getEmail(): string {
    return localStorage.getItem(this.ITEM_EMAIL);
  }

  private doLoginUser(email: string, tokens: Tokens): void {
    localStorage.setItem(this.ITEM_EMAIL, email);
    this.storeTokens(tokens);
  }

  private doLogoutUser(): void {
    localStorage.removeItem(this.ITEM_EMAIL);
    this.removeTokens();
    this.router.navigate(['/']).then();
  }

  private getRefreshToken(): string {
    return localStorage.getItem(this.ITEM_REFRESH_TOKEN);
  }

  private storeAccessToken(accessToken: string): void {
    localStorage.setItem(this.ITEM_ACCESS_TOKEN, accessToken);
  }

  private storeTokens(tokens: Tokens): void {
    localStorage.setItem(this.ITEM_ACCESS_TOKEN, tokens.accessToken);
    localStorage.setItem(this.ITEM_REFRESH_TOKEN, tokens.refreshToken);
  }

  private removeTokens(): void {
    localStorage.removeItem(this.ITEM_ACCESS_TOKEN);
    localStorage.removeItem(this.ITEM_REFRESH_TOKEN);
  }
}
