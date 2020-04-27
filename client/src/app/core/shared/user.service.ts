import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { environment } from '../../../environments/environment';
import { Observable } from 'rxjs';
import { UserSettingsProfile } from './user-settings-profile';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  private readonly apiUrl = `${environment.baseApiUrl}/users`;

  constructor(
    private httpClient: HttpClient,
  ) {
  }

  settingsProfile(): Observable<UserSettingsProfile> {
    return this.httpClient.get<UserSettingsProfile>(`${this.apiUrl}/settings/profile`);
  }
}
