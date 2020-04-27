import { Component } from '@angular/core';
import { Observable } from 'rxjs';

import { UserService } from '../../../../core/shared/user.service';
import { UserSettingsProfile } from '../../../../core/shared/user-settings-profile';

@Component({
  selector: 'app-settings-profile',
  templateUrl: './settings-profile.component.html',
  styleUrls: ['./settings-profile.component.scss'],
})
export class SettingsProfileComponent {
  userSettingsProfile$: Observable<UserSettingsProfile>;

  constructor(
    private userService: UserService,
  ) {
    this.userSettingsProfile$ = this.userService.settingsProfile();
  }
}
